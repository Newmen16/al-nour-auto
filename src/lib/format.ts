const groupFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

export function formatNumber(value: number): string {
  return groupFormatter.format(Math.round(value));
}

export function formatDZD(value: number, lang: "ar" | "en"): string {
  const suffix = lang === "ar" ? "دج" : "DZD";
  return `${formatNumber(value)} ${suffix}`;
}

export function formatPercent(value: number, digits = 1): string {
  return `${value.toFixed(digits).replace(".", ",")} %`;
}
