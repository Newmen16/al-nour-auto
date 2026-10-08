import { useI18n } from "../i18n/context";
import { Reveal } from "./Reveal";

export function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="border-t border-zinc-900 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold md:text-5xl">{t.process.title}</h2>
        </Reveal>

        <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-4">
          {t.process.steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 90}>
                <div className="border-t border-zinc-800 pt-6">
                  <span className="num block text-sm font-semibold text-gold-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold md:text-xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
