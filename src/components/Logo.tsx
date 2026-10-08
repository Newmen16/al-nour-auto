import { useI18n } from "../i18n/context";

export function Logo() {
  const { lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <a
      href="#top"
      className="group inline-flex items-center gap-2.5 rounded-[6px]"
      aria-label={isAr ? "النور أوتو، الصفحة الرئيسية" : "Al-Nour Auto, home"}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-[6px] border border-gold-700/70 bg-gold-400/10 transition-colors duration-200 group-hover:border-gold-400 group-hover:bg-gold-400/15">
        <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path
            d="M3 13.5V2.5L13 13.5V2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold-400"
          />
        </svg>
      </span>
      <span
        className={`text-[15px] leading-none font-bold text-zinc-50 ${isAr ? "" : "tracking-[0.1em]"}`}
      >
        {isAr ? "النور أوتو" : "AL-NOUR AUTO"}
      </span>
    </a>
  );
}
