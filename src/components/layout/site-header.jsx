"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Languages, Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { getEquipmentList } from "@/data/equipment";
import { jaNav, mainNav, whatsappLink } from "@/data/site";
import { localePath, switchLocalePath } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const copy = {
  en: {
    switchLabel: "日本語",
    switchLang: "ja",
    quote: "Request a quote",
    menu: "Menu",
    openMenu: "Open menu",
    menuTitle: "Not sure which system fits?",
    menuText: "Share your clinical needs and budget. We will suggest suitable units available in Japan.",
    viewAll: "View all equipment",
  },
  ja: {
    switchLabel: "English",
    switchLang: "en",
    quote: "お見積り依頼",
    menu: "メニュー",
    openMenu: "メニューを開く",
    menuTitle: "どの機器が適しているかお悩みですか？",
    menuText: "臨床ニーズとご予算をお知らせください。日本国内で入手可能な機器をご提案します。",
    viewAll: "すべての機器を見る",
  },
};

// Japanese labels run wider, so the Japanese desktop nav starts at xl instead of lg
const desktop = { en: "lg:flex", ja: "xl:flex" };
const mobileOnly = { en: "lg:hidden", ja: "xl:hidden" };
const desktopBlock = { en: "lg:block", ja: "xl:block" };

export function SiteHeader({ locale = "en" }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef(null);
  const isJa = locale === "ja";
  const nav = isJa ? jaNav : mainNav;
  const t = copy[locale];
  const equipment = getEquipmentList(locale);
  const home = localePath(locale, "/");
  const equipmentHref = localePath(locale, "/equipment");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 140);
  };

  const isActive = (href) => (href === home ? pathname === home : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white/92 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-b border-line shadow-[0_1px_0_rgb(14_42_71/0.02)]" : "border-b border-transparent"
      )}
    >
      <Container className="flex h-[76px] items-center justify-between gap-6">
        <Logo href={home} locale={locale} className="shrink-0 whitespace-nowrap" />

        <nav aria-label="Main" className={cn("hidden items-center gap-1", desktop[locale])}>
          {nav.map((item) =>
            item.hasMenu ? (
              <div key={item.href} onPointerEnter={openMenu} onPointerLeave={scheduleClose}>
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-controls="equipment-menu"
                  onClick={() => setMenuOpen((v) => !v)}
                  className={cn(
                    "inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-sm px-3 text-[0.95rem] transition-colors hover:text-teal",
                    isActive(item.href) || menuOpen ? "text-teal" : "text-ink"
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn("size-4 transition-transform duration-200", menuOpen && "rotate-180")} aria-hidden />
                </button>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex h-10 items-center whitespace-nowrap rounded-sm px-3 text-[0.95rem] transition-colors hover:text-teal",
                  isActive(item.href) ? "text-teal" : "text-ink"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className={cn("hidden items-center gap-2", desktop[locale])}>
          <Link
            href={switchLocalePath(pathname)}
            hrefLang={t.switchLang}
            className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-sm px-3 text-sm text-slate transition-colors hover:text-ink"
          >
            <Languages className="size-4" aria-hidden />
            {t.switchLabel}
          </Link>
          <Button asChild>
            <Link href={localePath(locale, "/contact")}>{t.quote}</Link>
          </Button>
        </div>

        <MobileMenu nav={nav} locale={locale} equipment={equipment} switchHref={switchLocalePath(pathname)} />
      </Container>

      {/* Equipment mega menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="equipment-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onPointerEnter={openMenu}
            onPointerLeave={scheduleClose}
            className={cn(
              "absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-[0_24px_40px_-24px_rgb(14_42_71/0.25)]",
              desktopBlock[locale]
            )}
          >
            <Container className="grid grid-cols-[1fr_17rem] gap-10 py-8">
              <ul className="grid grid-cols-3 gap-x-6 gap-y-1">
                {equipment.map((e) => (
                  <li key={e.slug}>
                    <Link
                      href={localePath(locale, `/equipment/${e.slug}`)}
                      className="group flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-paper"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-sm border border-line text-xs font-semibold text-ink transition-colors group-hover:border-teal group-hover:bg-teal group-hover:text-white">
                        {e.modality}
                      </span>
                      <span>
                        <span className="block font-medium text-ink">{e.name}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-slate">{e.summary}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col justify-between rounded-md bg-paper p-6">
                <div>
                  <p className="font-medium text-ink">{t.menuTitle}</p>
                  <p className="mt-2 text-sm text-slate">{t.menuText}</p>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <Button asChild size="sm">
                    <Link href={localePath(locale, "/contact")}>{t.quote}</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost" className="justify-start">
                    <Link href={equipmentHref}>{t.viewAll}</Link>
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu({ nav, locale, equipment, switchHref }) {
  const t = copy[locale];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className={mobileOnly[locale]} aria-label={t.openMenu}>
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent title={t.menu}>
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-16">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item) => (
              <div key={item.href} className="border-b border-line">
                <SheetClose asChild>
                  <Link href={item.href} className="block py-4 text-lg text-ink">
                    {item.label}
                  </Link>
                </SheetClose>
                {item.hasMenu && (
                  <ul className="mb-4 grid grid-cols-1 gap-1">
                    {equipment.map((e) => (
                      <li key={e.slug}>
                        <SheetClose asChild>
                          <Link href={localePath(locale, `/equipment/${e.slug}`)} className="flex items-center gap-3 py-1.5 text-[0.95rem] text-slate">
                            <span className="w-7 text-xs font-semibold text-teal">{e.modality}</span>
                            {e.name}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <SheetClose asChild>
              <Link href={switchHref} hrefLang={t.switchLang} className="flex items-center gap-2 py-4 text-slate">
                <Languages className="size-4" /> {t.switchLabel}
              </Link>
            </SheetClose>
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <SheetClose asChild>
              <Button asChild size="lg">
                <Link href={localePath(locale, "/contact")}>{t.quote}</Link>
              </Button>
            </SheetClose>
            <Button asChild size="lg" variant="whatsapp">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
