import type { CSSProperties, Dispatch, SetStateAction } from "react";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { useI18n } from "../i18n/context";
import {
  DOWN_MAX,
  DOWN_MIN,
  DOWN_STEP,
  DEFAULT_FINANCE,
  PRICE_MAX,
  PRICE_MIN,
  PRICE_STEP,
  TERM_MAX,
  TERM_MIN,
  TERM_STEP,
} from "../config";
import { computeFinance } from "../lib/finance";
import { formatDZD, formatPercent } from "../lib/format";
import type { FinanceInputs } from "../types";
import { Button, ButtonLink } from "./Button";
import { Reveal } from "./Reveal";

interface Props {
  finance: FinanceInputs;
  onChange: Dispatch<SetStateAction<FinanceInputs>>;
}

interface RangeProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}

function Range({ id, label, value, min, max, step, display, onChange }: RangeProps) {
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-zinc-400">
          {label}
        </label>
        <span className="num text-sm font-semibold text-zinc-100">{display}</span>
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
    </div>
  );
}

export function Simulator({ finance, onChange }: Props) {
  const { t, lang } = useI18n();
  const result = computeFinance(finance);

  const rows: [string, string][] = [
    [t.sim.financed, formatDZD(result.financed, lang)],
    [t.sim.margin, formatDZD(result.margin, lang)],
    [t.sim.total, formatDZD(result.total, lang)],
    [t.sim.marginRate, formatPercent(result.annualMarginRate)],
  ];

  return (
    <section id="finance" className="border-t border-zinc-900 bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold md:text-5xl">{t.sim.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 md:text-base">{t.sim.sub}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7" delay={60}>
            <div className="grid gap-9">
              <Range
                id="sim-price"
                label={t.sim.price}
                value={finance.price}
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                display={formatDZD(finance.price, lang)}
                onChange={(price) => onChange((prev) => ({ ...prev, price }))}
              />
              <Range
                id="sim-down"
                label={t.sim.down}
                value={finance.downPct}
                min={DOWN_MIN}
                max={DOWN_MAX}
                step={DOWN_STEP}
                display={formatPercent(finance.downPct, 0)}
                onChange={(downPct) => onChange((prev) => ({ ...prev, downPct }))}
              />
              <Range
                id="sim-term"
                label={t.sim.term}
                value={finance.months}
                min={TERM_MIN}
                max={TERM_MAX}
                step={TERM_STEP}
                display={`${finance.months} ${t.sim.monthly}`}
                onChange={(months) => onChange((prev) => ({ ...prev, months }))}
              />

              <div className="flex items-center justify-between gap-4 border-t border-zinc-900 pt-6">
                <p className="text-[13px] leading-relaxed text-zinc-600">{t.sim.disclaimer}</p>
                <Button
                  type="button"
                  variant="quiet"
                  className="h-9 shrink-0 px-4 text-xs"
                  onClick={() => onChange({ ...DEFAULT_FINANCE })}
                >
                  <ArrowsClockwise size={15} weight="bold" />
                  {t.sim.reset}
                </Button>
              </div>
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

              <ButtonLink href="#quote" variant="primary" className="mt-7 w-full">
                {t.nav.request}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
