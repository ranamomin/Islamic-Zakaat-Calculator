
import { ZakatState, CalculationResult } from '../types';
import { NISAB_THRESHOLDS, ZAKAT_RATE } from '../constants';

export function calculateZakat(state: ZakatState): CalculationResult {
  const goldValue = state.goldWeight * state.goldPricePerGram;
  const silverValue = state.silverWeight * state.silverPricePerGram;
  
  const totalAssets = 
    state.cash + 
    state.bank + 
    goldValue + 
    silverValue + 
    state.stocks + 
    state.businessAssets + 
    state.realEstateInvestment + 
    state.moneyOwedToYou;

  const netWealth = totalAssets - state.liabilities;
  
  // Dynamic Nisab calculation based on user preference
  const thresholdWeight = state.nisabBasis === 'GOLD' ? NISAB_THRESHOLDS.gold : NISAB_THRESHOLDS.silver;
  const pricePerGram = state.nisabBasis === 'GOLD' ? state.goldPricePerGram : state.silverPricePerGram;
  const nisabValue = thresholdWeight * pricePerGram;
  
  const isEligible = netWealth >= nisabValue;
  const zakatDue = isEligible ? Math.max(0, netWealth * ZAKAT_RATE) : 0;
  
  // Calculate progress percentage (capped at 100)
  const progressToNisab = nisabValue > 0 ? Math.min(100, Math.max(0, (netWealth / nisabValue) * 100)) : 0;

  return {
    totalAssets,
    totalLiabilities: state.liabilities,
    netWealth,
    nisabValue,
    isEligible,
    zakatDue,
    progressToNisab
  };
}
