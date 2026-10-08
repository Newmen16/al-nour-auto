import { WhatsappLogo } from "@phosphor-icons/react";
import { useI18n } from "../i18n/context";
import { brands } from "../data/cars";
import { SHOWROOM_PHONE_DISPLAY, SHOWROOM_PHONE_TEL, WHATSAPP_NUMBER } from "../config";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const contactRows: [string, string, string?][] = [
    [t.footer.hoursLabel, t.footer.hours],
    [t.footer.addressLabel, t.footer.address],
    [t.footer.phoneLabel, SHOWROOM_PHONE_DISPLAY, SHOWROOM_PHONE_TEL],
  ];

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-zinc-500">
            {t.footer.tagline}
          </p>
          <ButtonLink
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="mt-6"
          >
            <WhatsappLogo size={17} weight="fill" />
            {t.footer.whatsapp}
          </ButtonLink>
        </div>

        <div className="md:col-span-4">
          <h3 className="text-[11px] tracking-[0.14em] text-gold-400 uppercase">
            {t.footer.contact}
          </h3>
          <dl className="mt-4 grid gap-4">
            {contactRows.map(([label, value, href]) => (
              <div key={label}>
                <dt className="text-xs text-zinc-600">{label}</dt>
                <dd className="mt-0.5 text-sm text-zinc-300">
                  {href ? (
                    <a
                      href={`tel:${href}`}
                      className="num transition-colors duration-200 hover:text-gold-300"
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-[11px] tracking-[0.14em] text-gold-400 uppercase">
            {t.footer.brandsLabel}
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {brands.map((brand) => (
              <li key={brand.id} className="text-sm text-zinc-400">
                {brand.name}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-zinc-600">{t.nav.brandLine}</p>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-6 text-xs text-zinc-600 md:flex-row md:px-8">
          <p className="max-w-[62ch] leading-relaxed">{t.footer.legal}</p>
          <p className="num shrink-0">
            © {year} Al-Nour Auto. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
