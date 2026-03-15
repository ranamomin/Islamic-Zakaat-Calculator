
import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  prefix?: string;
  suffix?: string;
  helper?: string;
  error?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange, prefix, suffix, helper, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-slate-400 sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          type="number"
          value={value === 0 ? '' : value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={`block w-full rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition-all sm:text-sm h-11 border ${
            error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200'
          } ${
            prefix ? 'pl-8' : 'pl-3'
          } ${suffix ? 'pr-12' : 'pr-3'}`}
          placeholder="0.00"
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-slate-400 sm:text-sm">{suffix}</span>
          </div>
        )}
      </div>
      {error ? (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      ) : helper ? (
        <p className="mt-1 text-xs text-slate-400">{helper}</p>
      ) : null}
    </div>
  );
};

export default NumberInput;
