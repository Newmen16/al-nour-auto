import type { CSSProperties, Dispatch, SetStateAction } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { useI18n } from "../i18n/context";
import {
  DOWN_MAX,
  DOWN_MIN,
  DOWN_STEP,
  PRICE_MAX,
  PRICE_MIN,
  PRICE_STEP,
  TERM_MAX,
  TERM_MIN,
  TERM_STEP,
  WHATSAPP_NUMBER,
} from "../config";
import { computeFinance } from "../lib/finance";
import { formatDZD, formatPercent } from "../lib/format";
import type { FinanceInputs } from "../types";
import { Reveal } from "./Reveal";

interface Props {
  finance: FinanceInputs;
  onChange: Dispatch<SetStateAction<FinanceInputs>>;
  vehicleName?: string;
}

interface RangeProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  minLabel: string;
  maxLabel: string;
  onChange: (value: number) => void;
}

function Range({
  id,
  label,
  value,
  min,
  max,
  step,
  display,
  minLabel,
  maxLabel,
  onChange,
}: RangeProps) {
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div className="rounded-[6px] border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-zinc-300">
          {label}
        </label>
        <span className="num text-base font-semibold text-gold-300">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        className="mt-4"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--range-fill": `${fill}%` } as CSSProperties}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <div className="num mt-2 flex justify-between text-[11px] text-zinc-600">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export function Simulator({ finance, onChange, vehicleName }: Props) {
  const { t, lang } = useI18n();
  const result = computeFinance(finance);

  const rows: [string, string][] = [
    [t.sim.financed, formatDZD(result.financed, lang)],
    [t.sim.margin, formatDZD(result.margin, lang)],
    [t.sim.financedCost, formatDZD(result.total, lang)],
    [t.sim.acquisition, formatDZD(result.total + result.downPayment, lang)],
    [t.sim.marginRate, formatPercent(result.annualMarginRate)],
  ];

  const whatsappMessage = [
    `${t.sim.waIntro}${vehicleName ? ` ${vehicleName}` : ""}`,
    `${t.sim.price}: ${formatDZD(finance.price, lang)}`,
    `${t.sim.down} (${finance.downPct}%): ${formatDZD(result.downPayment, lang)}`,
    `${t.sim.term}: ${finance.months} ${t.sim.months}`,
    `${t.sim.monthly}: ${formatDZD(result.monthly, lang)} ${t.sim.perMonth}`,
    "",
    t.sim.waOutro,
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="finance" className="border-t border-zinc-900 bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-gold-400 uppercase">
              {t.sim.badge}
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">{t.sim.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 md:text-base">{t.sim.sub}</p>
            {vehicleName && (
              <p className="mt-3 text-sm text-zinc-400">
                <span className="text-zinc-200">{vehicleName}</span>
              </p>
            )}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7" delay={60}>
            <div className="grid gap-5">
              <Range
                id="sim-price"
                label={t.sim.price}
                value={finance.price}
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                display={formatDZD(finance.price, lang)}
                minLabel={formatDZD(PRICE_MIN, lang)}
                maxLabel={formatDZD(PRICE_MAX, lang)}
                onChange={(price) => onChange((prev) => ({ ...prev, price }))}
              />
              <Range
                id="sim-down"
                label={`${t.sim.down} (${finance.downPct}%)`}
                value={finance.downPct}
                min={DOWN_MIN}
                max={DOWN_MAX}
                step={DOWN_STEP}
                display={formatDZD(result.downPayment, lang)}
                minLabel={formatPercent(DOWN_MIN, 0)}
                maxLabel={formatPercent(DOWN_MAX, 0)}
                onChange={(downPct) => onChange((prev) => ({ ...prev, downPct }))}
              />
              <Range
                id="sim-term"
                label={t.sim.term}
                value={finance.months}
                min={TERM_MIN}
                max={TERM_MAX}
                step={TERM_STEP}
                display={`${finance.months} ${t.sim.months}`}
                minLabel={`${TERM_MIN} ${t.sim.months}`}
                maxLabel={`${TERM_MAX} ${t.sim.months}`}
                onChange={(months) => onChange((prev) => ({ ...prev, months }))}
              />

              <p className="text-[13px] leading-relaxed text-zinc-600">{t.sim.disclaimer}</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={140}>
            <div className="self-start rounded-[6px] border border-zinc-800 bg-zinc-900/50 p-6 md:p-8 lg:sticky lg:top-24">
              <div className="text-[11px] tracking-[0.14em] text-gold-400 uppercase">
                {t.sim.monthly}
              </div>
              <output
                htmlFor="sim-price sim-down sim-term"
                aria-live="polite"
                className="num mt-3 block text-[clamp(2rem,5vw,3.25rem)] leading-none font-semibold text-zinc-50"
              >
                {formatDZD(result.monthly, lang)}
              </output>

              <dl className="mt-7 grid gap-3 border-t border-zinc-800 pt-6">
                {rows.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-b border-zinc-800/70 pb-3 last:border-0"
                  >
                    <dt className="text-sm text-zinc-500">{label}</dt>
                    <dd className="num text-sm text-zinc-200">{value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex h-11 w-full select-none items-center justify-center gap-2 rounded-[6px] bg-gold-400 px-5 text-sm font-semibold leading-none text-zinc-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-gold-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
              >
                <WhatsappLogo size={17} weight="fill" />
                {t.sim.whatsapp}
              </a>
              <p className="mt-3 text-center text-[11px] text-zinc-600">{t.sim.whatsappNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
