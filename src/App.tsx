import { useState } from "react";
import { I18nProvider, useI18n } from "./i18n/context";
import { DEFAULT_FINANCE } from "./config";
import { brandById } from "./data/cars";
import type { Car, FinanceInputs } from "./types";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Catalog } from "./components/Catalog";
import { Simulator } from "./components/Simulator";
import { Process } from "./components/Process";
import { LeadForm } from "./components/LeadForm";
import { Footer } from "./components/Footer";
import { Reveal } from "./components/Reveal";

function Reassurance() {
  const { t } = useI18n();
  const cards = [t.reassure.warranty, t.reassure.admin, t.reassure.delivery];

  return (
    <section className="border-t border-zinc-900 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-3 md:px-8">
        {cards.map((card) => (
          <Reveal key={card.title}>
            <div className="h-full rounded-[6px] border border-zinc-800 bg-zinc-900/40 p-7 transition-colors duration-200 hover:border-zinc-700">
              <div className="mb-5 h-px w-10 bg-gold-400" />
              <h3 className="text-lg font-semibold md:text-xl">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">{card.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Page() {
  const [finance, setFinance] = useState<FinanceInputs>(DEFAULT_FINANCE);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleSimulate = (car: Car) => {
    setSelectedCar(car);
    setFinance((prev) => ({ ...prev, price: car.price }));
    document.getElementById("finance")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const vehicleName = selectedCar
    ? `${brandById(selectedCar.brand)?.name} ${selectedCar.model}`
    : undefined;

  return (
    <>
      <Nav />
      <main>
        <Hero car={selectedCar} />
        <Catalog onSimulate={handleSimulate} />
        <Simulator finance={finance} onChange={setFinance} vehicleName={vehicleName} />
        <Reassurance />
        <Process />
        <LeadForm finance={finance} />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  );
}
