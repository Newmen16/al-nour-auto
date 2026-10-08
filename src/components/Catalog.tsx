import { useMemo, useState } from "react";
import { useI18n } from "../i18n/context";
import { brandById, brands, cars } from "../data/cars";
import { formatDZD } from "../lib/format";
import type { BrandId, Car } from "../types";
import { Button } from "./Button";
import { CarLineArt } from "./CarLineArt";
import { CarModal } from "./CarModal";
import { Reveal } from "./Reveal";

interface Props {
  onSimulate: (car: Car) => void;
}

type Filter = BrandId | "all";

export function Catalog({ onSimulate }: Props) {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const [openCar, setOpenCar] = useState<Car | null>(null);

  const list = useMemo(
    () => (filter === "all" ? cars : cars.filter((car) => car.brand === filter)),
    [filter],
  );

  const activeBrand = filter === "all" ? undefined : brandById(filter);

  const simulate = (car: Car) => {
    setOpenCar(null);
    onSimulate(car);
  };

  return (
    <section id="stock" className="border-t border-zinc-900 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold md:text-5xl">{t.catalog.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 md:text-base">
              {t.catalog.sub}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label={t.catalog.title}>
            <button
              type="button"
              onClick={() => setFilter("all")}
              aria-pressed={filter === "all"}
              className={`h-9 rounded-[6px] border px-4 text-xs font-semibold transition-colors duration-200 ${
                filter === "all"
                  ? "border-gold-600 bg-gold-400/10 text-gold-300"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {t.catalog.all}
            </button>
            {brands.map((brand) => (
              <button
                key={brand.id}
                type="button"
                onClick={() => setFilter(brand.id)}
                aria-pressed={filter === brand.id}
                className={`h-9 rounded-[6px] border px-4 text-xs font-semibold transition-colors duration-200 ${
                  filter === brand.id
                    ? "border-gold-600 bg-gold-400/10 text-gold-300"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3">
          <p className="num text-xs text-zinc-500">{t.catalog.count(list.length)}</p>
          {activeBrand && (
            <p className="max-w-xl text-sm text-zinc-400">{activeBrand.tagline[lang]}</p>
          )}
        </div>

        <div className="mt-8 hidden grid-cols-12 gap-x-6 px-4 pb-3 text-[11px] tracking-[0.14em] text-zinc-600 uppercase md:grid">
          <span className="col-span-4">{t.specs.powertrain}</span>
          <span className="col-span-3">{t.specs.practical}</span>
          <span className="col-span-2">{t.catalog.price}</span>
          <span className="col-span-3 text-end">{t.catalog.simulate}</span>
        </div>

        {list.length === 0 ? (
          <div className="rounded-[6px] border border-dashed border-zinc-800 px-6 py-14 text-center text-sm text-zinc-500">
            {t.catalog.empty}
          </div>
        ) : (
          <ul className="border-t border-zinc-900">
            {list.map((car) => {
              const brand = brandById(car.brand);
              return (
                <li key={car.id}>
                  <article className="group grid grid-cols-1 gap-x-6 gap-y-5 border-b border-zinc-900 px-4 py-6 transition-colors duration-200 hover:bg-zinc-900/40 md:grid-cols-12 md:items-center md:rounded-[6px]">
                    <div className="flex items-center gap-5 md:col-span-4">
                      <div className="hidden w-32 shrink-0 text-zinc-700 transition-colors duration-300 group-hover:text-gold-500 sm:block">
                        <CarLineArt body={car.body} />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold tracking-[0.16em] text-zinc-500 uppercase">
                          {brand?.name}
                        </div>
                        <h3 className="mt-1 text-lg font-semibold md:text-xl">{car.model}</h3>
                        <p className="mt-1 text-sm text-zinc-500">
                          {t.specs.bodies[car.body]} · {car.power} {t.specs.hp}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <p className="text-sm text-zinc-400">{car.engine[lang]}</p>
                      <p className="num mt-1 text-xs text-zinc-600">
                        {String(car.consumption).replace(".", ",")} {t.specs.l100} · {car.transmission}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <span className="num text-base font-semibold text-zinc-100">
                        {formatDZD(car.price, lang)}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 md:col-span-3 md:justify-end">
                      <Button variant="quiet" className="h-9 px-4 text-xs" onClick={() => setOpenCar(car)}>
                        {t.catalog.sheet}
                      </Button>
                      <Button variant="ghost" className="h-9 px-4 text-xs" onClick={() => simulate(car)}>
                        {t.catalog.simulate}
                      </Button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {openCar && (
        <CarModal car={openCar} onClose={() => setOpenCar(null)} onSimulate={simulate} />
      )}
    </section>
  );
}
