"use client";

import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckCircle2, ChevronDown, Loader2, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { equipmentRange, rangeNameBySlug } from "@/data/equipment-range";
import { getSite, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Quote request form.
 * Primary: POST to a Google Apps Script web app that saves the inquiry to a Google Sheet and
 * forwards it to the company's WhatsApp (see google-apps-script/quote-form.gs). If
 * NEXT_PUBLIC_SHEETS_ENDPOINT is not set, it falls back to composing an email.
 * "Send on WhatsApp" opens the visitor's own WhatsApp with the request filled in.
 * With NEXT_PUBLIC_RECAPTCHA_SITE_KEY set, the primary send needs a Google reCAPTCHA v2 check.
 */
const SHEETS_ENDPOINT = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT;
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const copy = {
  en: {
    errors: {
      name: "Enter your name.",
      contact: "Add an email address or a WhatsApp number so we can reply.",
      email: "Check the email address.",
      country: "Enter the destination country.",
      captcha: "Please complete the security check.",
    },
    message: {
      heading: "Quote request: used medical equipment",
      name: "Name",
      organisation: "Hospital / company",
      country: "Destination country",
      email: "Email",
      whatsapp: "WhatsApp",
      equipment: "Equipment",
      requirement: "Requirement",
    },
    subject: (data) => `Quote request from ${data.name} (${data.country})`,
    undecided: "Not decided yet",
    other: "Other",
    sentTitle: "Thank you. Your request has been sent.",
    sentText: (hours) => `We will reply within one business day (${hours}) with available units, photos and pricing.`,
    sendAnother: "Send another request",
    labels: {
      name: "Your name",
      organisation: "Hospital or company",
      email: "Email",
      whatsapp: "WhatsApp number",
      country: "Destination country",
      equipment: "Equipment",
      message: "Your requirement",
    },
    optional: "(optional)",
    placeholder: "Preferred brands, configuration, budget, timeline, or anything else we should know.",
    sending: "Sending…",
    send: "Send inquiry",
    sendWhatsapp: "Send on WhatsApp",
    errorBefore: "Sorry, your request could not be sent. Please try again,",
    errorLink: "send it by email",
    errorAfter: "or use WhatsApp.",
    emailOpened: "Your email app has opened with the request filled in. Press send there to reach us.",
    whatsappOpened: "WhatsApp has opened with your request. Press send there to reach us.",
    captchaFailed: "The security check failed. Please complete it again and resend.",
    hintSheet: "We reply within one business day. Prefer chat? Send it on WhatsApp instead.",
    hintApps: "Both options open your own app with the request filled in, ready to send.",
  },
  ja: {
    errors: {
      name: "お名前を入力してください。",
      contact: "返信先として、メールアドレスまたはWhatsApp番号を入力してください。",
      email: "メールアドレスをご確認ください。",
      country: "納入先の国を入力してください。",
      captcha: "セキュリティ確認を完了してください。",
    },
    message: {
      heading: "お見積り依頼：中古医療機器",
      name: "お名前",
      organisation: "病院名・会社名",
      country: "納入先の国",
      email: "メール",
      whatsapp: "WhatsApp",
      equipment: "機器",
      requirement: "ご要望",
    },
    subject: (data) => `お見積り依頼：${data.name}様（${data.country}）`,
    undecided: "未定",
    other: "その他",
    sentTitle: "ありがとうございます。ご依頼を送信しました。",
    sentText: (hours) => `1営業日以内（${hours}）に、在庫のある機器、写真、価格をご案内します。`,
    sendAnother: "別の依頼を送信する",
    labels: {
      name: "お名前",
      organisation: "病院名・会社名",
      email: "メールアドレス",
      whatsapp: "WhatsApp番号",
      country: "納入先の国",
      equipment: "機器",
      message: "ご要望内容",
    },
    optional: "（任意）",
    placeholder: "ご希望のメーカー、構成、ご予算、時期など、お知らせいただきたい内容をご記入ください。",
    sending: "送信中…",
    send: "お問い合わせを送信",
    sendWhatsapp: "WhatsAppで送信",
    errorBefore: "申し訳ありません。送信できませんでした。もう一度お試しいただくか、",
    errorLink: "メールで送信",
    errorAfter: "、またはWhatsAppをご利用ください。",
    emailOpened: "メールアプリが開き、依頼内容が入力されています。そちらで送信してください。",
    whatsappOpened: "WhatsAppが開き、依頼内容が入力されています。そちらで送信してください。",
    captchaFailed: "セキュリティ確認に失敗しました。もう一度確認してから送信してください。",
    hintSheet: "1営業日以内にご返信します。チャットをご希望の場合は、WhatsAppでも送信できます。",
    hintApps: "どちらのボタンも、依頼内容が入力された状態でお使いのアプリが開きます。",
  },
};

export function QuoteForm({ defaultEquipment = "", locale = "en", className, compact = false }) {
  const t = copy[locale];
  const site = getSite(locale);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | captcha | email | whatsapp
  const useCaptcha = Boolean(SHEETS_ENDPOINT && RECAPTCHA_SITE_KEY);
  const captchaRef = useRef(null);
  const [token, setToken] = useState("");
  // The standard checkbox is 304px wide; very narrow phones get the compact one
  const [compactCaptcha, setCompactCaptcha] = useState(false);
  // Options are the range names; `defaultEquipment` and ?equipment= take a category page slug
  const preset = rangeNameBySlug[defaultEquipment] ?? "";
  const [selected, setSelected] = useState(preset);

  // Pre-select equipment from ?equipment=slug (keeps the page static)
  useEffect(() => {
    if (defaultEquipment) return;
    const slug = new URLSearchParams(window.location.search).get("equipment");
    if (rangeNameBySlug[slug]) setSelected(rangeNameBySlug[slug]);
  }, [defaultEquipment]);

  useEffect(() => {
    if (useCaptcha) setCompactCaptcha(window.matchMedia("(max-width: 359px)").matches);
  }, [useCaptcha]);

  function resetCaptcha() {
    captchaRef.current?.reset();
    setToken("");
  }

  function collect(form) {
    const data = Object.fromEntries(new FormData(form));
    const next = {};
    if (!data.name?.trim()) next.name = t.errors.name;
    if (!data.email?.trim() && !data.whatsapp?.trim()) next.email = t.errors.contact;
    else if (data.email?.trim() && !/^\S+@\S+\.\S+$/.test(data.email.trim())) next.email = t.errors.email;
    if (!data.country?.trim()) next.country = t.errors.country;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) form.elements[first]?.focus();
    return first ? null : data;
  }

  function compose(data) {
    const m = t.message;
    return [
      m.heading,
      "",
      `${m.name}: ${data.name}`,
      data.organisation && `${m.organisation}: ${data.organisation}`,
      `${m.country}: ${data.country}`,
      data.email && `${m.email}: ${data.email}`,
      data.whatsapp && `${m.whatsapp}: ${data.whatsapp}`,
      `${m.equipment}: ${data.equipment || t.undecided}`,
      "",
      data.message && `${m.requirement}:\n${data.message}`,
    ]
      .filter((l) => l !== undefined && l !== false && l !== "")
      .join("\n");
  }

  function openEmail(data) {
    const subject = t.subject(data);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compose(data))}`;
  }

  async function submitToSheet(form, data) {
    // URL-encoded body keeps this a "simple" CORS request, which Apps Script accepts without a preflight.
    const body = new URLSearchParams({
      ...data,
      equipment: data.equipment || "Not decided yet",
      page: window.location.href,
      token,
    });
    setStatus("sending");
    try {
      const res = await fetch(SHEETS_ENDPOINT, { method: "POST", body });
      const json = await res.json();
      if (json.error === "captcha") {
        resetCaptcha();
        setStatus("captcha");
        return;
      }
      if (!json.ok) throw new Error(json.error || "Submission failed");
      form.reset();
      setSelected(preset);
      setToken("");
      setStatus("sent");
    } catch {
      if (useCaptcha) resetCaptcha(); // a token can only be used once
      setStatus("error");
    }
  }

  function send(channel, form) {
    const data = collect(form);
    if (!data) return;
    if (channel === "whatsapp") {
      window.open(whatsappLink(compose(data)), "_blank", "noopener,noreferrer");
      setStatus("whatsapp");
    } else if (channel === "email-fallback" || !SHEETS_ENDPOINT) {
      openEmail(data);
      setStatus("email");
    } else if (useCaptcha && !token) {
      setErrors((e) => ({ ...e, captcha: t.errors.captcha }));
    } else {
      submitToSheet(form, data);
    }
  }

  if (status === "sent") {
    return (
      <div className={cn("rounded-lg bg-teal-tint p-8 text-center", className)} role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto size-10 text-teal" aria-hidden />
        <h3 className="mt-4 text-subtitle">{t.sentTitle}</h3>
        <p className="mx-auto mt-3 max-w-[44ch] text-slate">{t.sentText(site.hours)}</p>
        <Button type="button" variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          {t.sendAnother}
        </Button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!sending) send("primary", e.currentTarget);
      }}
      className={cn("grid gap-5", className)}
    >
      {/* Honeypot: hidden from people, filled in by bots; the script discards these */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={cn("grid gap-5", !compact && "sm:grid-cols-2")}>
        <Field id="name" label={t.labels.name} error={errors.name}>
          <Input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} />
        </Field>
        <Field id="organisation" label={t.labels.organisation} optional={t.optional}>
          <Input id="organisation" name="organisation" autoComplete="organization" />
        </Field>
        <Field id="email" label={t.labels.email} error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />
        </Field>
        <Field id="whatsapp" label={t.labels.whatsapp} optional={t.optional}>
          <Input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" placeholder="+971 50 000 0000" />
        </Field>
        <Field id="country" label={t.labels.country} error={errors.country}>
          <Input id="country" name="country" autoComplete="country-name" aria-invalid={!!errors.country} />
        </Field>
        <Field id="equipment" label={t.labels.equipment}>
          <div className="relative">
            <select
              id="equipment"
              name="equipment"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="h-11 w-full appearance-none rounded-sm border border-input bg-white px-3.5 pr-10 text-base text-ink md:text-[0.95rem] focus-visible:border-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal/15"
            >
              <option value="">{t.undecided}</option>
              {equipmentRange.groups.map((g) => (
                <optgroup key={g.id} label={g.title}>
                  {g.items.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </optgroup>
              ))}
              <option value="Other">{t.other}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate" aria-hidden />
          </div>
        </Field>
      </div>
      <Field id="message" label={t.labels.message} optional={t.optional}>
        <Textarea id="message" name="message" placeholder={t.placeholder} />
      </Field>

      {useCaptcha && (
        <div>
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            hl={locale}
            size={compactCaptcha ? "compact" : "normal"}
            onChange={(value) => {
              setToken(value ?? "");
              if (value) setErrors((e) => ({ ...e, captcha: undefined }));
            }}
            onExpired={() => setToken("")}
            onErrored={() => setToken("")}
            className="min-h-[78px]"
          />
          {errors.captcha && <p className="mt-2 text-sm text-seal">{errors.captcha}</p>}
        </div>
      )}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <Button type="submit" size="lg" className="sm:flex-1" disabled={sending}>
          {sending ? <Loader2 className="animate-spin" /> : <Send />}
          {sending ? t.sending : t.send}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="whatsapp"
          className="sm:flex-1"
          disabled={sending}
          onClick={(e) => send("whatsapp", e.currentTarget.form)}
        >
          <MessageCircle /> {t.sendWhatsapp}
        </Button>
      </div>
      <p className={cn("text-sm", status === "error" || status === "captcha" ? "text-seal" : "text-slate")} role="status" aria-live="polite">
        {status === "error" && (
          <>
            {t.errorBefore}
            {locale === "en" && " "}
            <button type="button" className="font-medium underline underline-offset-2" onClick={(e) => send("email-fallback", e.currentTarget.form)}>
              {t.errorLink}
            </button>
            {locale === "en" && " "}
            {t.errorAfter}
          </>
        )}
        {status === "captcha" && t.captchaFailed}
        {status === "email" && t.emailOpened}
        {status === "whatsapp" && t.whatsappOpened}
        {(status === "idle" || status === "sending") && (SHEETS_ENDPOINT ? t.hintSheet : t.hintApps)}
      </p>
    </form>
  );
}

function Field({ id, label, optional, error, children }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label}
        {optional && <span className="ml-1.5 font-normal text-slate">{optional}</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-seal">{error}</p>}
    </div>
  );
}
