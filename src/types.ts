export type Lang = "ar" | "en" | "fr";

export interface L10n {
  ar: string;
  en: string;
  fr: string;
}

export type BrandId = "geely" | "chery" | "jetour" | "baic" | "changan" | "dfsk";

export type BodyType = "sedan" | "suv" | "coupe-suv" | "offroad" | "utility";

export type FuelKey = "petrol";

export type Drivetrain = "FWD" | "AWD" | "4WD" | "RWD";

export interface Car {
  id: string;
  brand: BrandId;
  model: string;
  body: BodyType;
  price: number;
  engine: L10n;
  power: number;
  transmission: string;
  fuel: FuelKey;
  consumption: number;
  seats: number;
  drivetrain: Drivetrain;
  warrantyYears: number;
  warrantyKm: number;
}

export interface Brand {
  id: BrandId;
  name: string;
  tagline: L10n;
}

export interface Wilaya {
  code: string;
  name: L10n;
}

export interface FinanceInputs {
  price: number;
  downPct: number;
  months: number;
}

export interface FinanceResult {
  downPayment: number;
  financed: number;
  margin: number;
  total: number;
  monthly: number;
  annualMarginRate: number;
}
