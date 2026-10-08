import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, type Dict } from "./en";
import { ar } from "./ar";
import { fr } from "./fr";
import type { Lang } from "../types";

interface I18nValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dict;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const STORAGE_KEY = "alnour.lang";

const I18nContext = createContext<I18nValue | null>(null);

function readInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ar" || stored === "fr") return stored;
  } catch {

  }
  return "ar";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    const dict = lang === "ar" ? ar : lang === "fr" ? fr : en;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.title = dict.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", dict.meta.description);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {

    }
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(
    () => setLangState((current) => (current === "ar" ? "en" : current === "en" ? "fr" : "ar")),
    [],
  );

  const value = useMemo<I18nValue>(
    () => ({ lang, dir, t: lang === "ar" ? ar : lang === "fr" ? fr : en, setLang, toggleLang }),
    [lang, dir, setLang, toggleLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
