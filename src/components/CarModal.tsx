import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";
import { useI18n } from "../i18n/context";
import type { Car } from "../types";
import { brandById } from "../data/cars";
import { formatDZD, formatNumber } from "../lib/format";
import { Button } from "./Button";
import { CarLineArt } from "./CarLineArt";

interface Props {
  car: Car;
  onClose: () => void;
  onSimulate: (car: Car) => void;
}

export function CarModal({ car, onClose, onSimulate }: Props) {
  const { t, lang } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const brand = brandById(car.brand);

  useEffect(() => {
    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const focusables = (): HTMLElement[] => {
      const panel = panelRef.current;
      if (!panel) return [];
      return Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus();
    };
  }, [onClose]);

  const groups: { title: string; rows: [string, string][] }[] = [
    {
      title: t.specs.powertrain,
      rows: [
        [t.specs.engine, car.engine[lang]],
        [t.specs.power, `${car.power} ${t.specs.hp}`],
        [t.specs.transmission, car.transmission],
        [t.specs.fuel, t.specs.petrol],
        [t.specs.drivetrain, car.drivetrain],
      ],
    },
    {
      title: t.specs.practical,
      rows: [
        [t.specs.body, t.specs.bodies[car.body]],
        [t.specs.consumption, `${String(car.consumption).replace(".", ",")} ${t.specs.l100}`],
        [t.specs.seats, String(car.seats)],
      ],
    },
    {
      title: t.specs.warranty,
      rows: [
        [t.specs.coverage, `${car.warrantyYears} ${t.specs.years}`],
        [t.specs.mileage, `${formatNumber(car.warrantyKm)} ${t.specs.km}`],
      ],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-zinc-950/85 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        tabIndex={-1}
        className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-[6px] border border-zinc-800 bg-zinc-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] outline-none sm:rounded-[6px]"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-zinc-800 bg-zinc-900/95 px-5 py-4 backdrop-blur-md md:px-8 md:py-5">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.16em] text-gold-400 uppercase">
              {brand?.name}
            </div>
            <h2 id="sheet-title" className="mt-1 text-2xl font-semibold md:text-3xl">
              {car.model}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t.catalog.closeSheet}
            className="grid size-9 shrink-0 place-items-center rounded-[6px] border border-zinc-700 text-zinc-300 transition-colors duration-200 hover:border-zinc-500 hover:text-zinc-50"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="px-5 pt-6 md:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <CarLineArt
              body={car.body}
              className="w-full max-w-sm text-zinc-600 sm:text-zinc-700"
            />
            <div className="sm:text-end">
              <div className="text-[11px] tracking-[0.14em] text-zinc-500 uppercase">
                {t.catalog.price}
              </div>
              <div className="num mt-1 text-3xl font-semibold text-zinc-50 md:text-4xl">
                {formatDZD(car.price, lang)}
              </div>
            </div>
          </div>

          <dl className="mt-8 grid gap-x-8 gap-y-7 border-t border-zinc-800 pt-7 md:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <dt className="text-[11px] tracking-[0.14em] text-gold-400 uppercase">
                  {group.title}
                </dt>
                <dd className="mt-3 grid gap-2.5">
                  {group.rows.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-baseline justify-between gap-3 border-b border-zinc-800/70 pb-2.5 last:border-0"
                    >
                      <span className="text-sm text-zinc-500">{label}</span>
                      <span className="num text-sm text-zinc-200">{value}</span>
                    </div>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-800 px-5 py-5 sm:flex-row sm:justify-end md:px-8">
          <Button variant="quiet" onClick={onClose}>
            {t.catalog.closeSheet}
          </Button>
          <Button variant="primary" onClick={() => onSimulate(car)}>
            {t.catalog.simulate}
          </Button>
        </div>
      </div>
    </div>
  );
}
