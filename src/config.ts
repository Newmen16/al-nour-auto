import type { FinanceInputs } from "./types";

export const WHATSAPP_NUMBER = "213560123456";

export const SHOWROOM_PHONE_DISPLAY = "+213 560 12 34 56";

export const SHOWROOM_PHONE_TEL = "+213560123456";

export const PRICE_MIN = 2000000;

export const PRICE_MAX = 8000000;

export const PRICE_STEP = 50000;

export const DOWN_MIN = 20;

export const DOWN_MAX = 70;

export const DOWN_STEP = 5;

export const TERM_MIN = 12;

export const TERM_MAX = 60;

export const TERM_STEP = 6;

export const ANNUAL_MARGIN_RATE = 0.055;

export const DEFAULT_FINANCE: FinanceInputs = {
  price: 3490000,
  downPct: 20,
  months: 36,
};
