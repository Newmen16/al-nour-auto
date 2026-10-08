import { useEffect, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { useI18n } from "../i18n/context";
import type { Lang } from "../types";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";

const links = [
  { href: "#stock", key: "stock" },
  { href: "#finance", key: "financing" },
  { href: "#process", key: "how" },
] as const;

const langOptions: { id: Lang; label: string }[] = [
  { id: "ar", label: "AR" },
  { id: "en", label: "EN" },
  { id: "fr", label: "FR" },
];

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-900 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
        <Logo />

        <nav aria-label="main" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors duration-200 hover:text-zinc-50"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <div
            role="group"
            aria-label={t.nav.langAria}
            className="inline-flex items-center rounded-[6px] border border-zinc-700 p-0.5"
          >
            {langOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setLang(option.id)}
                aria-pressed={lang === option.id}
                className={`inline-flex h-8 items-center rounded-[4px] px-2.5 text-xs font-semibold transition-colors duration-200 ${
                  lang === option.id
                    ? "bg-gold-400 text-zinc-950"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <ButtonLink
            href="#quote"
            variant="primary"
            className="hidden h-9 px-4 text-xs sm:inline-flex"
          >
            {t.nav.request}
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.menu}
            className="grid size-9 place-items-center rounded-[6px] border border-zinc-700 text-zinc-200 transition-colors duration-200 hover:border-zinc-500 md:hidden"
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-zinc-900 bg-zinc-950/97 px-5 pt-4 pb-6 md:hidden"
      >
        <nav aria-label="mobile" className="grid gap-1">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-[6px] px-3 py-3 text-base text-zinc-200 transition-colors duration-200 hover:bg-zinc-900 hover:text-zinc-50"
            >
              {t.nav[link.key]}
            </a>
          ))}
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-[6px] bg-gold-400 px-3 py-3 text-center text-base font-semibold text-zinc-950"
          >
            {t.nav.request}
          </a>
        </nav>
      </div>
    </header>
  );
}
