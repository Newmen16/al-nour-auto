export type PhoneCheck =
  | { ok: true; normalized: string; formatted: string }
  | { ok: false; reason: "format" | "prefix" };

export function digitsOnly(input: string): string {
  return input.replace(/\D/g, "");
}

export function formatAlgerianPhone(digits: string): string {
  const d = digits.slice(0, 10);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)} ${d.slice(2)}`;
  if (d.length <= 6) return `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4)}`;
  if (d.length <= 8)
    return `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4, 6)} ${d.slice(6)}`;
  return `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
}

export function validateAlgerianPhone(input: string): PhoneCheck {
  let d = digitsOnly(input);

  if (d.startsWith("213")) d = `0${d.slice(3)}`;
  if (d.length === 9 && d.startsWith("6")) d = `0${d}`;
  if (d.startsWith("00213")) d = `0${d.slice(5)}`;

  if (d.length !== 10) return { ok: false, reason: "format" };
  if (!/^0[567]/.test(d)) return { ok: false, reason: "prefix" };

  return {
    ok: true,
    normalized: d,
    formatted: formatAlgerianPhone(d),
  };
}
