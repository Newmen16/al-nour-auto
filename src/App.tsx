import { useState } from "react";
import { I18nProvider } from "./i18n/context";
import { DEFAULT_FINANCE } from "./config";
import type { Car, FinanceInputs } from "./types";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Catalog } from "./components/Catalog";
import { Simulator } from "./components/Simulator";
import { Process } from "./components/Process";
import { LeadForm } from "./components/LeadForm";
import { Footer } from "./components/Footer";

function Page() {
  const [finance, setFinance] = useState<FinanceInputs>(DEFAULT_FINANCE);

  const handleSimulate = (car: Car) => {
    setFinance((prev) => ({ ...prev, price: car.price }));
    document.getElementById("finance")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Catalog onSimulate={handleSimulate} />
        <Simulator finance={finance} onChange={setFinance} />
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
