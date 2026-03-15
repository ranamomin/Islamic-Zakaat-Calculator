
import { NisabThresholds } from './types';

export const NISAB_THRESHOLDS: NisabThresholds = {
  gold: 87.48,
  silver: 612.36
};

export const ZAKAT_RATE = 0.025; // 2.5%

export const DEFAULT_GOLD_PRICE = 75.50; 
export const DEFAULT_SILVER_PRICE = 0.95;

export const DEFAULT_FITRANA_RATE = 10.00; // Average per person in USD
export const DEFAULT_FIDYA_RATE = 10.00; // Cost to feed one person
export const DEFAULT_KAFFARAH_RATE = 600.00; // Cost to feed 60 people

export const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'GBP', symbol: '£' },
  { code: 'EUR', symbol: '€' },
  { code: 'SAR', symbol: 'SR' },
  { code: 'AED', symbol: 'DH' },
  { code: 'PKR', symbol: 'Rs' },
  { code: 'INR', symbol: '₹' }
];
