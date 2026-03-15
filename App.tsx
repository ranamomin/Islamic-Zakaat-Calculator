
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import NumberInput from './components/NumberInput';
import EducationalResources from './components/EducationalResources';
import { ZakatState, CalculationResult, CharityModule, FitranaState, SadaqahState, CompensationState } from './types';
import { 
  DEFAULT_GOLD_PRICE, 
  DEFAULT_SILVER_PRICE, 
  CURRENCIES, 
  DEFAULT_FITRANA_RATE, 
  DEFAULT_FIDYA_RATE, 
  DEFAULT_KAFFARAH_RATE 
} from './constants';
import { calculateZakat } from './utils/calculations';
import { 
  Coins, 
  Wallet, 
  TrendingUp, 
  ArrowRightLeft, 
  CheckCircle2, 
  Info,
  Heart,
  Globe,
  Zap
} from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<CharityModule>('ZAKAT');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [zakat, setZakat] = useState<ZakatState>({
    cash: 0, bank: 0, goldWeight: 0, goldPricePerGram: DEFAULT_GOLD_PRICE,
    silverWeight: 0, silverPricePerGram: DEFAULT_SILVER_PRICE,
    stocks: 0, businessAssets: 0, realEstateInvestment: 0,
    moneyOwedToYou: 0, liabilities: 0, currency: 'USD',
    nisabBasis: 'SILVER'
  });

  const [fitrana, setFitrana] = useState<FitranaState>({
    familyMembers: 1,
    ratePerPerson: DEFAULT_FITRANA_RATE
  });

  const [sadaqah, setSadaqah] = useState<SadaqahState>({
    intentionAmount: 0,
    frequency: 'once'
  });

  const [compensation, setCompensation] = useState<CompensationState>({
    missedFasts: 0,
    fidyaRate: DEFAULT_FIDYA_RATE,
    kaffarahCount: 0,
    kaffarahRate: DEFAULT_KAFFARAH_RATE
  });

  const zakatResults: CalculationResult = useMemo(() => calculateZakat(zakat), [zakat]);
  const fitranaTotal = fitrana.familyMembers * fitrana.ratePerPerson;
  const compensationTotal = (compensation.missedFasts * compensation.fidyaRate) + (compensation.kaffarahCount * compensation.kaffarahRate);
  const grandTotal = zakatResults.zakatDue + fitranaTotal + sadaqah.intentionAmount + compensationTotal;

  const currentCurrency = CURRENCIES.find(c => c.code === zakat.currency) || CURRENCIES[0];

  const updateZakat = (key: keyof ZakatState, val: any) => {
    setZakat(prev => ({ ...prev, [key]: val }));
    if (typeof val === 'number' && val < 0) {
       setErrors(prev => ({ ...prev, [key]: 'Negative value' }));
    } else {
       setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[key];
          return newErrors;
       });
    }
  };

  return (
    <Layout 
      activeModule={activeModule} 
      onModuleChange={setActiveModule}
    >
      <div className="px-4 py-6 space-y-6">
        
        {/* Main Summary Card */}
        <div className="bg-emerald-900 text-white p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 bg-emerald-400/10 w-32 h-32 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Total Contribution</span>
              <div className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-full text-[10px] font-bold">
                <Globe className="w-3 h-3" />
                <select
                  value={zakat.currency}
                  onChange={(e) => updateZakat('currency', e.target.value)}
                  className="bg-transparent border-none p-0 focus:ring-0 cursor-pointer outline-none text-[10px]"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code} className="text-slate-800">{c.code}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-4xl font-serif font-bold mb-4">
              {currentCurrency.symbol}{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <p className="text-[9px] uppercase tracking-tighter opacity-60">Zakat Due</p>
                <p className="text-sm font-bold">{currentCurrency.symbol}{zakatResults.zakatDue.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                <p className="text-[9px] uppercase tracking-tighter opacity-60">Other Charity</p>
                <p className="text-sm font-bold">{currentCurrency.symbol}{(grandTotal - zakatResults.zakatDue).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Screen Content */}
        {activeModule === 'ZAKAT' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-serif font-bold text-slate-800">
              Zakat al Mal
            </h2>

            <section className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Nisab Basis: {zakat.nisabBasis}
                </h3>
                <div className="flex bg-white p-0.5 rounded-lg border border-emerald-200">
                  {['SILVER', 'GOLD'].map(b => (
                    <button 
                      key={b}
                      onClick={() => updateZakat('nisabBasis', b)}
                      className={`px-3 py-1 rounded text-[10px] font-bold transition-all ${zakat.nisabBasis === b ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full h-1.5 bg-emerald-200 rounded-full mb-2">
                <div 
                  className="h-full bg-emerald-600 transition-all duration-700"
                  style={{ width: `${zakatResults.progressToNisab}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-1">
                {zakatResults.isEligible ? <CheckCircle2 className="w-3 h-3" /> : <Info className="w-3 h-3" />}
                {zakatResults.isEligible ? 'Obligatory Wealth Reached' : 'Under Nisab Threshold'}
              </p>
            </section>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center gap-3 text-slate-800 mb-2">
                <Wallet className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold">Liquid Assets</h3>
              </div>
              <NumberInput label="Total Cash & Savings" value={zakat.cash + zakat.bank} onChange={(v) => updateZakat('cash', v)} prefix={currentCurrency.symbol} />
              <NumberInput label="Money Owed to You" value={zakat.moneyOwedToYou} onChange={(v) => updateZakat('moneyOwedToYou', v)} prefix={currentCurrency.symbol} />
            </div>

            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center gap-3 text-slate-800 mb-2">
                <Coins className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold">Metals & Trading</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <NumberInput label="Gold (g)" value={zakat.goldWeight} onChange={(v) => updateZakat('goldWeight', v)} suffix="g" />
                <NumberInput label="Silver (g)" value={zakat.silverWeight} onChange={(v) => updateZakat('silverWeight', v)} suffix="g" />
              </div>
              <NumberInput label="Business Stock/Crypto" value={zakat.stocks + zakat.businessAssets} onChange={(v) => updateZakat('stocks', v)} prefix={currentCurrency.symbol} />
            </div>

            <div className="bg-red-50 p-5 rounded-3xl border border-red-100 space-y-4">
              <div className="flex items-center gap-3 text-red-900 mb-2">
                <ArrowRightLeft className="w-5 h-5 text-red-500" />
                <h3 className="font-bold">Deductible Debts</h3>
              </div>
              <NumberInput label="Current Liabilities" value={zakat.liabilities} onChange={(v) => updateZakat('liabilities', v)} prefix={currentCurrency.symbol} />
            </div>
          </div>
        )}

        {activeModule === 'FITRANA' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
             <h2 className="text-2xl font-serif font-bold text-slate-800">Zakat al-Fitr</h2>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-6">
                <NumberInput label="Family Members" value={fitrana.familyMembers} onChange={(v) => setFitrana(f => ({ ...f, familyMembers: Math.max(0, v) }))} suffix="people" />
                <NumberInput label="Rate Per Person" value={fitrana.ratePerPerson} onChange={(v) => setFitrana(f => ({ ...f, ratePerPerson: v }))} prefix={currentCurrency.symbol} />
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">Total Due</p>
                  <p className="text-2xl font-bold text-amber-900">{currentCurrency.symbol}{fitranaTotal.toFixed(2)}</p>
                </div>
             </div>
          </div>
        )}

        {activeModule === 'SADAQAH' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
             <h2 className="text-2xl font-serif font-bold text-slate-800">Voluntary Sadaqah</h2>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-6">
                <NumberInput label="One-time or Monthly Gift" value={sadaqah.intentionAmount} onChange={(v) => setSadaqah(s => ({ ...s, intentionAmount: v }))} prefix={currentCurrency.symbol} />
                <div className="grid grid-cols-2 gap-2">
                  {['once', 'daily', 'weekly', 'monthly'].map(f => (
                    <button 
                      key={f}
                      onClick={() => setSadaqah(s => ({ ...s, frequency: f as any }))}
                      className={`p-3 rounded-2xl text-xs font-bold border transition-all ${sadaqah.frequency === f ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                    >
                      {f.toUpperCase()}
                    </button>
                  ))}
                </div>
             </div>
          </div>
        )}

        {activeModule === 'COMPENSATION' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
             <h2 className="text-2xl font-serif font-bold text-slate-800">Fidya & Kaffarah</h2>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-700 text-sm uppercase tracking-widest">Fidya (Fast Missed)</h3>
                  <NumberInput label="Days" value={compensation.missedFasts} onChange={(v) => setCompensation(c => ({ ...c, missedFasts: v }))} suffix="d" />
                  <NumberInput label="Daily Rate" value={compensation.fidyaRate} onChange={(v) => setCompensation(c => ({ ...c, fidyaRate: v }))} prefix={currentCurrency.symbol} />
                </div>
                <hr className="border-slate-100" />
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-700 text-sm uppercase tracking-widest">Kaffarah (Expiation)</h3>
                  <NumberInput label="Broken Oaths" value={compensation.kaffarahCount} onChange={(v) => setCompensation(c => ({ ...c, kaffarahCount: v }))} />
                  <NumberInput label="Incident Rate" value={compensation.kaffarahRate} onChange={(v) => setCompensation(c => ({ ...c, kaffarahRate: v }))} prefix={currentCurrency.symbol} />
                </div>
             </div>
          </div>
        )}

        {activeModule === 'RESOURCES' && <EducationalResources />}
      </div>
    </Layout>
  );
};

export default App;
