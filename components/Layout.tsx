
import React from 'react';
import { Wallet, Users, Scale, Heart, ShieldCheck, BookOpen } from 'lucide-react';
import { CharityModule } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeModule: CharityModule;
  onModuleChange: (module: CharityModule) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeModule, onModuleChange }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24">
      {/* Mobile App Header */}
      <header className="bg-emerald-900 text-white pt-12 pb-6 px-4 sticky top-0 z-50 border-b border-emerald-800/50 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-serif font-bold">Islamic App</h1>
          </div>
          
          <a 
            href="https://donate.stripe.com/6oE28S6X99S7aR27ss" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors"
          >
            <Heart className="w-5 h-5 text-emerald-400 fill-current" />
          </a>
        </div>
      </header>
      
      <main className="flex-grow max-w-md mx-auto w-full">
        {children}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 px-6 py-3 pb-safe z-50 flex items-center justify-around shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
        <button 
          onClick={() => onModuleChange('ZAKAT')}
          className={`flex flex-col items-center space-y-1 transition-all ${activeModule === 'ZAKAT' ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
        >
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Zakat</span>
        </button>

        <button 
          onClick={() => onModuleChange('FITRANA')}
          className={`flex flex-col items-center space-y-1 transition-all ${activeModule === 'FITRANA' ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
        >
          <Users className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Fitrana</span>
        </button>

        <button 
          onClick={() => onModuleChange('SADAQAH')}
          className={`flex flex-col items-center space-y-1 transition-all ${activeModule === 'SADAQAH' ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Sadaqah</span>
        </button>

        <button 
          onClick={() => onModuleChange('COMPENSATION')}
          className={`flex flex-col items-center space-y-1 transition-all ${activeModule === 'COMPENSATION' ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
        >
          <Scale className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Kaffarah</span>
        </button>

        <button 
          onClick={() => onModuleChange('RESOURCES')}
          className={`flex flex-col items-center space-y-1 transition-all ${activeModule === 'RESOURCES' ? 'text-emerald-600 scale-110' : 'text-slate-400'}`}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Learn</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
