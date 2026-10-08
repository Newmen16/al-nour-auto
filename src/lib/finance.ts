import { ANNUAL_MARGIN_RATE } from "../config";
import type { FinanceInputs, FinanceResult } from "../types";

export function computeFinance(inputs: FinanceInputs): FinanceResult {
  const { price, downPct, months } = inputs;
  const downPayment = Math.round((price * downPct) / 100);
  const financed = Math.max(price - downPayment, 0);
  const margin = Math.round(financed * ANNUAL_MARGIN_RATE * (months / 12));
  const total = financed + margin;
  const monthly = Math.round(total / months);

  return {
    downPayment,
    financed,
    margin,
    total,
    monthly,
    annualMarginRate: ANNUAL_MARGIN_RATE * 100,
  };
}
