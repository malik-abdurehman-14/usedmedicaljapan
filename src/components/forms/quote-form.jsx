"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { equipment, getEquipmentList } from "@/data/equipment";
import { getSite, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Quote request form.
 * Primary: POST to a Google Apps Script web app that appends a row to a Google Sheet
 * (see google-apps-script/quote-form.gs). If NEXT_PUBLIC_SHEETS_ENDPOINT is not set,
 * it falls back to composing an email. WhatsApp is always available.
 */
const SHEETS_ENDPOINT = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT;

const copy = {
  en: {
    errors: {
      name: "Enter your name.",
      contact: "Add an email address or a WhatsApp number so we can reply.",
      email: "Check the email address.",
      country: "Enter the destination country.",
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
    send: "Send request",
    sendEmail: "Send by email",
    sendWhatsapp: "Send on WhatsApp",
    errorBefore: "Sorry, your request could not be sent. Please try again,",
    errorLink: "send it by email",
    errorAfter: "or use WhatsApp.",
    emailOpened: "Your email app has opened with the request filled in. Press send there to reach us.",
    whatsappOpened: "WhatsApp has opened with your request. Press send there to reach us.",
    hintSheet: "We reply within one business day. Prefer chat? Send it on WhatsApp instead.",
    hintApps: "Both options open your own app with the request filled in, ready to send.",
  },
  ja: {
    errors: {
      name: "お名前を入力してください。",
      contact: "返信先として、メールアドレスまたはWhatsApp番号を入力してください。",
      email: "メールアドレスをご確認ください。",
      country: "納入先の国を入力してください。",
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
    send: "送信する",
    sendEmail: "メールで送信",
    sendWhatsapp: "WhatsAppで送信",
    errorBefore: "申し訳ありません。送信できませんでした。もう一度お試しいただくか、",
    errorLink: "メールで送信",
    errorAfter: "、またはWhatsAppをご利用ください。",
    emailOpened: "メールアプリが開き、依頼内容が入力されています。そちらで送信してください。",
    whatsappOpened: "WhatsAppが開き、依頼内容が入力されています。そちらで送信してください。",
    hintSheet: "1営業日以内にご返信します。チャットをご希望の場合は、WhatsAppでも送信できます。",
    hintApps: "どちらのボタンも、依頼内容が入力された状態でお使いのアプリが開きます。",
  },
};

export function QuoteForm({ defaultEquipment = "", locale = "en", className, compact = false }) {
  const t = copy[locale];
  const site = getSite(locale);
  const options = getEquipmentList(locale);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | email | whatsapp
  const [selected, setSelected] = useState(defaultEquipment);

  // Pre-select equipment from ?equipment=slug (keeps the page static)
  useEffect(() => {
    if (defaultEquipment) return;
    const slug = new URLSearchParams(window.location.search).get("equipment");
    if (slug && equipment.some((e) => e.slug === slug)) setSelected(slug);
  }, [defaultEquipment]);

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
    const item = options.find((e) => e.slug === data.equipment);
    const m = t.message;
    return [
      m.heading,
      "",
      `${m.name}: ${data.name}`,
      data.organisation && `${m.organisation}: ${data.organisation}`,
      `${m.country}: ${data.country}`,
      data.email && `${m.email}: ${data.email}`,
      data.whatsapp && `${m.whatsapp}: ${data.whatsapp}`,
      `${m.equipment}: ${item ? item.name : t.undecided}`,
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
    // The sheet always records the English equipment name, whatever the page language
    const item = equipment.find((e) => e.slug === data.equipment);
    // URL-encoded body keeps this a "simple" CORS request, which Apps Script accepts without a preflight.
    const body = new URLSearchParams({
      ...data,
      equipment: item ? item.name : "Not decided yet",
      page: window.location.href,
    });
    setStatus("sending");
    try {
      const res = await fetch(SHEETS_ENDPOINT, { method: "POST", body });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Submission failed");
      form.reset();
      setSelected(defaultEquipment);
      setStatus("sent");
    } catch {
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
              className="h-11 w-full appearance-none rounded-sm border border-input bg-white px-3.5 pr-10 text-[0.95rem] text-ink focus-visible:border-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal/15"
            >
              <option value="">{t.undecided}</option>
              {options.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate" aria-hidden />
          </div>
        </Field>
      </div>
      <Field id="message" label={t.labels.message} optional={t.optional}>
        <Textarea id="message" name="message" placeholder={t.placeholder} />
      </Field>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <Button type="submit" size="lg" className="sm:flex-1" disabled={sending}>
          {sending ? <Loader2 className="animate-spin" /> : SHEETS_ENDPOINT ? <Send /> : <Mail />}
          {sending ? t.sending : SHEETS_ENDPOINT ? t.send : t.sendEmail}
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
      <p className={cn("text-sm", status === "error" ? "text-seal" : "text-slate")} role="status" aria-live="polite">
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
