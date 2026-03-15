
import React from 'react';
import { BookOpen, HelpCircle, CheckCircle, Info, Star, Shield } from 'lucide-react';

const EducationalResources: React.FC = () => {
  const faqs = [
    {
      question: "What is the Nisab threshold?",
      answer: "Nisab is the minimum amount of wealth a Muslim must possess for a full lunar year before Zakat becomes obligatory. It is based on the value of 87.48g of gold or 612.36g of silver."
    },
    {
      question: "Is Zakat due on my home?",
      answer: "Zakat is not due on the house you live in. However, if you own investment properties or land for business, Zakat may be due on their value or the rental income."
    },
    {
      question: "Can I pay Zakat to my parents?",
      answer: "No, Zakat cannot be given to your direct ancestors (parents, grandparents) or direct descendants (children, grandchildren), as you are already responsible for their maintenance."
    },
    {
      question: "When should I pay Zakat?",
      answer: "Zakat is due once every lunar year (Hawl) has passed since your wealth reached the Nisab threshold. Many people choose to pay during Ramadan for extra blessings, but it can be paid any time."
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 pb-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-serif font-bold text-slate-800">Educational Resources</h2>
        <p className="text-slate-500 text-sm">Understanding the third pillar of Islam</p>
      </div>

      {/* What is Zakat */}
      <section className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-100 p-2 rounded-xl">
            <BookOpen className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">What is Zakat?</h3>
        </div>
        <p className="text-slate-600 leading-relaxed text-sm">
          Zakat is the third pillar of Islam. It is a mandatory charitable contribution, often considered a tax, 
          that Muslims pay to help the poor and needy. The word "Zakat" means "to purify" or "to grow," 
          signifying that giving away a portion of one's wealth purifies the remainder and brings blessings.
        </p>
      </section>

      {/* Eligibility & Nisab */}
      <div className="grid grid-cols-1 gap-4">
        <section className="bg-emerald-900 text-white p-6 rounded-[2rem] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/10 w-24 h-24 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xl font-bold">Who is Eligible?</h3>
            </div>
            <ul className="space-y-3 text-sm text-emerald-50/90">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Muslim of sound mind and reached puberty.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Possesses wealth above the Nisab threshold.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Has held that wealth for one full lunar year (Hawl).</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 p-2 rounded-xl">
              <Star className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">The Concept of Nisab</h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Nisab is the minimum amount of wealth you must have before you are required to pay Zakat. 
            If your wealth is below this amount, you don't have to pay Zakat for that year.
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              <span>Standard</span>
              <span>Weight</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="text-sm font-medium">Gold Nisab</span>
              <span className="text-sm font-bold text-slate-800">87.48g</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">Silver Nisab</span>
              <span className="text-sm font-bold text-slate-800">612.36g</span>
            </div>
          </div>
        </section>
      </div>

      {/* Types of Zakat */}
      <section className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Types of Zakat</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-emerald-700 text-sm mb-1">Zakat al-Mal</h4>
            <p className="text-xs text-slate-600">Zakat on wealth, including cash, gold, silver, business assets, and investments. Usually 2.5% of total qualifying wealth.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-emerald-700 text-sm mb-1">Zakat al-Fitr</h4>
            <p className="text-xs text-slate-600">A small amount paid by every head of household for themselves and their dependents before the Eid al-Fitr prayer.</p>
          </div>
        </div>
      </section>

      {/* Importance */}
      <section className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-600 p-2 rounded-xl">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-emerald-900">Importance & Benefits</h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Purifies your wealth and soul from greed.",
            "Supports the most vulnerable in the community.",
            "Reduces economic inequality.",
            "Fulfills a divine obligation and earns rewards."
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-emerald-800 font-medium">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              {benefit}
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle className="w-5 h-5 text-slate-400" />
          <h3 className="text-xl font-bold text-slate-800">Frequently Asked Questions</h3>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-800 text-sm mb-2">{faq.question}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EducationalResources;
