import { useEffect, useRef } from "react";
import { useI18n } from "../i18n/context";
import { brandById } from "../data/cars";
import { formatDZD } from "../lib/format";
import type { Car } from "../types";
import { ButtonLink } from "./Button";
import { HeroStudio, type PointerState } from "./HeroStudio";

interface Props {
  car?: Car | null;
}

export function Hero({ car }: Props) {
  const { t, lang } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const pointer = useRef<PointerState>({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate min-h-[100dvh] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(115%_85%_at_72%_42%,#17171b_0%,#0d0d10_45%,#09090b_75%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
        <HeroStudio pointer={pointer} />
      </div>
      <div
        aria-hidden="true"
        className="hscrim pointer-events-none absolute inset-0 -z-[5]"
      />

      <div className="pointer-events-none absolute bottom-6 end-5 z-10 max-w-[min(20rem,calc(100%-2.5rem))] rounded-[6px] border border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-md md:end-8">
        {car ? (
          <>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-gold-400 uppercase">
              {brandById(car.brand)?.name}
            </p>
            <p className="mt-1 text-sm font-semibold text-zinc-50">{car.model}</p>
            <p className="num mt-0.5 text-xs text-zinc-400">{formatDZD(car.price, lang)}</p>
          </>
        ) : (
          <p className="text-xs leading-relaxed text-zinc-500">{t.hero.studioHint}</p>
        )}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-5 pt-20 pb-14 md:px-8 md:pt-24">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h1 className="max-w-[16ch] text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.08] font-semibold text-zinc-50">
              {t.hero.headline}
            </h1>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-zinc-400 md:text-lg">
              {t.hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#quote" variant="primary">
                {t.hero.request}
              </ButtonLink>
              <ButtonLink href="#stock" variant="ghost">
                {t.hero.browse}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
