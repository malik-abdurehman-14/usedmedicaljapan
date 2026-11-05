/**
 * Used Medical Equipment Japan — quote form → Google Sheet, WhatsApp and email notifications.
 *
 * Paste this into Extensions → Apps Script of the Google Sheet that should
 * collect the requests, then deploy it as a Web app (see README.md).
 *
 * Secrets live in Project Settings → Script properties, not in this file:
 *   RECAPTCHA_SECRET   Google reCAPTCHA v2 secret key. Unset → no CAPTCHA check.
 *   CALLMEBOT_PHONE    WhatsApp number that receives each inquiry, digits only (e.g. 819061170042).
 *   CALLMEBOT_APIKEY   API key CallMeBot sends to that number. Unset → no WhatsApp message.
 */

const SHEET_NAME = "Quote requests";
// Who gets an email for each new request. Use "" to turn notifications off.
const NOTIFY_EMAIL = "info@usedmedicaljapan.com";

const FIELDS = [
  ["Received", null],
  ["Name", "name"],
  ["Hospital / company", "organisation"],
  ["Email", "email"],
  ["WhatsApp", "whatsapp"],
  ["Destination country", "country"],
  ["Equipment", "equipment"],
  ["Requirement", "message"],
  ["Page", "page"],
  ["Status", null],
];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Honeypot filled in → bot. Pretend success so it doesn't retry.
  if (p.website) return json({ ok: true });

  if (!p.name || !p.country || (!p.email && !p.whatsapp)) {
    return json({ ok: false, error: "Missing required fields" });
  }

  if (!passesCaptcha(p.token)) return json({ ok: false, error: "captcha" });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet();
    const row = FIELDS.map(([header, key]) => {
      if (header === "Received") return new Date();
      if (header === "Status") return "New";
      return clean(p[key]);
    });
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  // The row is saved either way, so a failed notification doesn't fail the request
  try {
    notifyWhatsapp(p);
  } catch (err) {
    console.error("WhatsApp notification failed", err);
  }
  if (NOTIFY_EMAIL) {
    try {
      notify(p);
    } catch (err) {
      console.error("Email notification failed", err);
    }
  }

  return json({ ok: true });
}

// Lets you open the web app URL in a browser to check it is live.
function doGet() {
  return json({ ok: true, service: "quote-form" });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(FIELDS.map(([header]) => header));
    sheet.getRange(1, 1, 1, FIELDS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notify(p) {
  const lines = FIELDS.filter(([, key]) => key && p[key]).map(([header, key]) => `${header}: ${p[key]}`);
  const options = {
    to: NOTIFY_EMAIL,
    subject: `Quote request from ${p.name} (${p.country})`,
    body: `${lines.join("\n")}\n\nOpen the sheet: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
  };
  if (p.email && /^\S+@\S+\.\S+$/.test(p.email)) options.replyTo = p.email;
  MailApp.sendEmail(options);
}

function passesCaptcha(token) {
  const secret = PropertiesService.getScriptProperties().getProperty("RECAPTCHA_SECRET");
  if (!secret) return true;
  if (!token) return false;
  const res = UrlFetchApp.fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "post",
    payload: { secret: secret, response: token },
    muteHttpExceptions: true,
  });
  return JSON.parse(res.getContentText()).success === true;
}

function notifyWhatsapp(p) {
  const props = PropertiesService.getScriptProperties();
  const phone = props.getProperty("CALLMEBOT_PHONE");
  const apikey = props.getProperty("CALLMEBOT_APIKEY");
  if (!phone || !apikey) return;
  const lines = FIELDS.filter(([, key]) => key && key !== "page" && p[key]).map(([header, key]) => `${header}: ${p[key]}`);
  const text = `New inquiry from the website\n\n${lines.join("\n")}`.slice(0, 1500);
  const url =
    "https://api.callmebot.com/whatsapp.php?phone=" + encodeURIComponent(phone) +
    "&text=" + encodeURIComponent(text) +
    "&apikey=" + encodeURIComponent(apikey);
  UrlFetchApp.fetch(url, { muteHttpExceptions: true });
}

// Trim, cap length, and stop values being interpreted as spreadsheet formulas.
function clean(value) {
  const s = String(value || "").trim().slice(0, 5000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
