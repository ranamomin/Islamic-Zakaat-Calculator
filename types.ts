
export enum AssetCategory {
  CASH = 'CASH',
  GOLD_SILVER = 'GOLD_SILVER',
  STOCKS_INVESTMENTS = 'STOCKS_INVESTMENTS',
  BUSINESS_ASSETS = 'BUSINESS_ASSETS',
  REAL_ESTATE = 'REAL_ESTATE',
  DEBTS_OWED = 'DEBTS_OWED'
}

export type CharityModule = 'ZAKAT' | 'FITRANA' | 'SADAQAH' | 'COMPENSATION' | 'RESOURCES';
export type NisabBasis = 'GOLD' | 'SILVER';

export interface ZakatState {
  cash: number;
  bank: number;
  goldWeight: number;
  goldPricePerGram: number;
  silverWeight: number;
  silverPricePerGram: number;
  stocks: number;
  businessAssets: number;
  realEstateInvestment: number;
  moneyOwedToYou: number;
  liabilities: number;
  currency: string;
  nisabBasis: NisabBasis;
}

export interface FitranaState {
  familyMembers: number;
  ratePerPerson: number;
}

export interface SadaqahState {
  intentionAmount: number;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
}

export interface CompensationState {
  missedFasts: number;
  fidyaRate: number;
  kaffarahCount: number;
  kaffarahRate: number;
}

export interface NisabThresholds {
  gold: number; 
  silver: number;
}

export interface CalculationResult {
  totalAssets: number;
  totalLiabilities: number;
  netWealth: number;
  nisabValue: number;
  isEligible: boolean;
  zakatDue: number;
  progressToNisab: number;
}
