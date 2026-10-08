import { useState, type FormEvent } from "react";
import { CaretDown, CheckCircle, WhatsappLogo } from "@phosphor-icons/react";
import { useI18n } from "../i18n/context";
import { WHATSAPP_NUMBER } from "../config";
import { brandById, brands, cars } from "../data/cars";
import { wilayas } from "../data/wilayas";
import { computeFinance } from "../lib/finance";
import { formatDZD } from "../lib/format";
import { digitsOnly, formatAlgerianPhone, validateAlgerianPhone } from "../lib/phone";
import type { FinanceInputs } from "../types";
import { Button, ButtonLink } from "./Button";
import { Reveal } from "./Reveal";

interface Props {
  finance: FinanceInputs;
}

interface Values {
  name: string;
  wilaya: string;
  phone: string;
  model: string;
}

type Errors = Partial<Record<keyof Values, string>>;

const inputBase =
  "h-11 w-full rounded-[6px] border bg-zinc-950 px-4 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors duration-200 focus:border-gold-600";

export function LeadForm({ finance }: Props) {
  const { t, lang } = useI18n();
  const [values, setValues] = useState<Values>({
    name: "",
    wilaya: "",
    phone: "",
    model: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const selectedWilaya = wilayas.find((wilaya) => wilaya.code === values.wilaya);
  const selectedCar = cars.find((car) => car.id === values.model);

  const set = (key: keyof Values) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (values.name.trim().length < 3) next.name = t.lead.errors.name;
    if (!selectedWilaya) next.wilaya = t.lead.errors.wilaya;
    if (!validateAlgerianPhone(values.phone).ok) next.phone = t.lead.errors.phone;
    return next;
  };

  const buildUrl = (): string => {
    const result = computeFinance(finance);
    const phoneCheck = validateAlgerianPhone(values.phone);
    const phone = phoneCheck.ok ? phoneCheck.formatted : values.phone.trim();
    const model = selectedCar
      ? `${brandById(selectedCar.brand)?.name} ${selectedCar.model}`
      : t.lead.modelPh;
    const simulation =
      lang === "ar"
        ? `المحاكاة: ${formatDZD(finance.price, "ar")}، دفعة أولى ${finance.downPct}%، ${finance.months} شهر، قسط ${formatDZD(result.monthly, "ar")}`
        : `Simulation: ${formatDZD(finance.price, "en")}, ${finance.downPct}% down, ${finance.months} months, ${formatDZD(result.monthly, "en")} per month`;

    const lines = [
      lang === "ar"
        ? "السلام عليكم، أريد عرض سعر من النور أوتو."
        : "Hello, I would like a quote from Al-Nour Auto.",
      `${t.lead.name}: ${values.name.trim()}`,
      `${t.lead.wilaya}: ${selectedWilaya?.code} - ${selectedWilaya?.name[lang] ?? ""}`,
      `${t.lead.phone}: ${phone}`,
      `${t.lead.model}: ${model}`,
      simulation,
    ];

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    const firstKey = (Object.keys(next) as (keyof Values)[])[0];
    if (firstKey) {
      document.getElementById(`lead-${firstKey}`)?.focus();
      return;
    }
    const url = buildUrl();
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (sentUrl) {
    return (
      <section id="quote" className="border-t border-zinc-900 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-xl rounded-[6px] border border-zinc-800 bg-zinc-900/50 p-8 text-center md:p-12">
            <CheckCircle size={40} weight="fill" className="mx-auto text-gold-400" />
            <h2 className="mt-5 text-2xl font-semibold md:text-3xl">{t.lead.successTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{t.lead.successText}</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={sentUrl} target="_blank" rel="noopener noreferrer" variant="primary">
                <WhatsappLogo size={17} weight="fill" />
                {t.lead.again}
              </ButtonLink>
              <Button variant="quiet" onClick={() => setSentUrl(null)}>
                {t.lead.edit}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="border-t border-zinc-900 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-3xl font-semibold md:text-5xl">{t.lead.title}</h2>
              <p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-zinc-500 md:text-base">
                {t.lead.sub}
              </p>
              <p className="mt-8 border-t border-zinc-900 pt-6 text-[13px] text-zinc-600">
                {t.lead.privacy}
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={80}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-[6px] border border-zinc-800 bg-zinc-900/50 p-6 md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="lead-name" className="block text-sm text-zinc-400">
                    {t.lead.name}
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    autoComplete="name"
                    placeholder={t.lead.namePh}
                    value={values.name}
                    onChange={(event) => set("name")(event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "lead-name-error" : undefined}
                    className={`${inputBase} ${errors.name ? "border-red-400" : "border-zinc-700"} mt-2`}
                  />
                  {errors.name && (
                    <p id="lead-name-error" role="alert" className="mt-2 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="lead-phone" className="block text-sm text-zinc-400">
                    {t.lead.phone}
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={t.lead.phonePh}
                    value={values.phone}
                    onChange={(event) =>
                      set("phone")(formatAlgerianPhone(digitsOnly(event.target.value)))
                    }
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                    className={`${inputBase} num ${errors.phone ? "border-red-400" : "border-zinc-700"} mt-2`}
                  />
                  {errors.phone && (
                    <p id="lead-phone-error" role="alert" className="mt-2 text-xs text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="lead-wilaya" className="block text-sm text-zinc-400">
                    {t.lead.wilaya}
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="lead-wilaya"
                      value={values.wilaya}
                      onChange={(event) => set("wilaya")(event.target.value)}
                      aria-invalid={Boolean(errors.wilaya)}
                      aria-describedby={errors.wilaya ? "lead-wilaya-error" : undefined}
                      className={`${inputBase} ${errors.wilaya ? "border-red-400" : "border-zinc-700"} appearance-none pe-10`}
                    >
                      <option value="">{t.lead.wilayaPh}</option>
                      {wilayas.map((wilaya) => (
                        <option key={wilaya.code} value={wilaya.code}>
                          {wilaya.code} · {wilaya.name[lang]}
                        </option>
                      ))}
                    </select>
                    <CaretDown
                      size={15}
                      weight="bold"
                      className="pointer-events-none absolute inset-y-0 end-3 my-auto text-zinc-500"
                    />
                  </div>
                  {errors.wilaya && (
                    <p id="lead-wilaya-error" role="alert" className="mt-2 text-xs text-red-400">
                      {errors.wilaya}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="lead-model" className="block text-sm text-zinc-400">
                    {t.lead.model}
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="lead-model"
                      value={values.model}
                      onChange={(event) => set("model")(event.target.value)}
                      className={`${inputBase} border-zinc-700 appearance-none pe-10`}
                    >
                      <option value="">{t.lead.modelPh}</option>
                      {brands.map((brand) => (
                        <optgroup key={brand.id} label={brand.name}>
                          {cars
                            .filter((car) => car.brand === brand.id)
                            .map((car) => (
                              <option key={car.id} value={car.id}>
                                {car.model}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                    </select>
                    <CaretDown
                      size={15}
                      weight="bold"
                      className="pointer-events-none absolute inset-y-0 end-3 my-auto text-zinc-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-4 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] leading-relaxed text-zinc-600">{t.lead.privacy}</p>
                <Button type="submit" variant="primary" className="shrink-0">
                  <WhatsappLogo size={17} weight="fill" />
                  {t.lead.submit}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
