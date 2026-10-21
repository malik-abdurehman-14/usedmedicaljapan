"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { equipment } from "@/data/equipment";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Quote request form.
 * Primary: POST to a Google Apps Script web app that appends a row to a Google Sheet
 * (see google-apps-script/quote-form.gs). If NEXT_PUBLIC_SHEETS_ENDPOINT is not set,
 * it falls back to composing an email. WhatsApp is always available.
 */
const SHEETS_ENDPOINT = process.env.NEXT_PUBLIC_SHEETS_ENDPOINT;

export function QuoteForm({ defaultEquipment = "", className, compact = false }) {
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
    if (!data.name?.trim()) next.name = "Enter your name.";
    if (!data.email?.trim() && !data.whatsapp?.trim()) next.email = "Add an email address or a WhatsApp number so we can reply.";
    else if (data.email?.trim() && !/^\S+@\S+\.\S+$/.test(data.email.trim())) next.email = "Check the email address.";
    if (!data.country?.trim()) next.country = "Enter the destination country.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) form.elements[first]?.focus();
    return first ? null : data;
  }

  function compose(data) {
    const item = equipment.find((e) => e.slug === data.equipment);
    return [
      "Quote request: used medical equipment",
      "",
      `Name: ${data.name}`,
      data.organisation && `Hospital / company: ${data.organisation}`,
      `Destination country: ${data.country}`,
      data.email && `Email: ${data.email}`,
      data.whatsapp && `WhatsApp: ${data.whatsapp}`,
      `Equipment: ${item ? item.name : "Not decided yet"}`,
      "",
      data.message && `Requirement:\n${data.message}`,
    ]
      .filter((l) => l !== undefined && l !== false && l !== "")
      .join("\n");
  }

  function openEmail(data) {
    const subject = `Quote request from ${data.name} (${data.country})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compose(data))}`;
  }

  async function submitToSheet(form, data) {
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
        <h3 className="mt-4 text-subtitle">Thank you. Your request has been sent.</h3>
        <p className="mx-auto mt-3 max-w-[44ch] text-slate">
          We will reply within one business day ({site.hours}) with available units, photos and pricing.
        </p>
        <Button type="button" variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another request
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
        <Field id="name" label="Your name" error={errors.name}>
          <Input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} />
        </Field>
        <Field id="organisation" label="Hospital or company" optional>
          <Input id="organisation" name="organisation" autoComplete="organization" />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />
        </Field>
        <Field id="whatsapp" label="WhatsApp number" optional>
          <Input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" placeholder="+971 50 000 0000" />
        </Field>
        <Field id="country" label="Destination country" error={errors.country}>
          <Input id="country" name="country" autoComplete="country-name" aria-invalid={!!errors.country} />
        </Field>
        <Field id="equipment" label="Equipment">
          <div className="relative">
            <select
              id="equipment"
              name="equipment"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="h-11 w-full appearance-none rounded-sm border border-input bg-white px-3.5 pr-10 text-[0.95rem] text-ink focus-visible:border-teal focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-teal/15"
            >
              <option value="">Not decided yet</option>
              {equipment.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate" aria-hidden />
          </div>
        </Field>
      </div>
      <Field id="message" label="Your requirement" optional>
        <Textarea
          id="message"
          name="message"
          placeholder="Preferred brands, configuration, budget, timeline, or anything else we should know."
        />
      </Field>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <Button type="submit" size="lg" className="sm:flex-1" disabled={sending}>
          {sending ? <Loader2 className="animate-spin" /> : SHEETS_ENDPOINT ? <Send /> : <Mail />}
          {sending ? "Sending…" : SHEETS_ENDPOINT ? "Send request" : "Send by email"}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="whatsapp"
          className="sm:flex-1"
          disabled={sending}
          onClick={(e) => send("whatsapp", e.currentTarget.form)}
        >
          <MessageCircle /> Send on WhatsApp
        </Button>
      </div>
      <p className={cn("text-sm", status === "error" ? "text-seal" : "text-slate")} role="status" aria-live="polite">
        {status === "error" && (
          <>
            Sorry, your request could not be sent. Please try again,{" "}
            <button type="button" className="font-medium underline underline-offset-2" onClick={(e) => send("email-fallback", e.currentTarget.form)}>
              send it by email
            </button>{" "}
            or use WhatsApp.
          </>
        )}
        {status === "email" && "Your email app has opened with the request filled in. Press send there to reach us."}
        {status === "whatsapp" && "WhatsApp has opened with your request. Press send there to reach us."}
        {(status === "idle" || status === "sending") &&
          (SHEETS_ENDPOINT
            ? "We reply within one business day. Prefer chat? Send it on WhatsApp instead."
            : "Both options open your own app with the request filled in, ready to send.")}
      </p>
    </form>
  );
}

function Field({ id, label, optional, error, children }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>
        {label}
        {optional && <span className="ml-1.5 font-normal text-slate">(optional)</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-seal">{error}</p>}
    </div>
  );
}
