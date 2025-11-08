
import React from 'react';
import { Vitals } from '../types';
import { HeartIcon, ActivityIcon, LungIcon, SparklesIcon } from './Icons';

interface VitalsFormProps {
  vitals: Vitals;
  onVitalsChange: (newVitals: Partial<Vitals>) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const VitalsForm: React.FC<VitalsFormProps> = ({ vitals, onVitalsChange, onSubmit, isLoading }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? 0 : parseInt(value, 10);
    if (!isNaN(numericValue)) {
      onVitalsChange({ [name]: numericValue });
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700">
      <h2 className="text-2xl font-semibold text-white mb-6">Enter Your Vitals</h2>
      <div className="space-y-6">
        <InputGroup
          label="Heart Rate"
          name="heartRate"
          value={vitals.heartRate}
          onChange={handleInputChange}
          unit="BPM"
          icon={<HeartIcon className="w-5 h-5 text-red-400" />}
        />
        <InputGroup
          label="Pulse Rate"
          name="pulseRate"
          value={vitals.pulseRate}
          onChange={handleInputChange}
          unit="BPM"
          icon={<ActivityIcon className="w-5 h-5 text-yellow-400" />}
        />
        <InputGroup
          label="Oxygen Level"
          name="oxygenLevel"
          value={vitals.oxygenLevel}
          onChange={handleInputChange}
          unit="SpO₂ %"
          icon={<LungIcon className="w-5 h-5 text-sky-400" />}
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="mt-8 w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-105"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Analyzing...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Analyze My Vitals
          </>
        )}
      </button>
    </div>
  );
};

interface InputGroupProps {
  label: string;
  name: keyof Vitals;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit: string;
  icon: React.ReactNode;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, name, value, onChange, unit, icon }) => (
  <div>
    <label htmlFor={name} className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
      {icon}
      {label}
    </label>
    <div className="relative">
      <input
        type="number"
        id={name}
        name={name}
        value={value === 0 ? '' : value}
        onChange={onChange}
        className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 text-lg rounded-md block p-3 pr-20 focus:ring-cyan-500 focus:border-cyan-500 transition"
        placeholder="e.g. 80"
        min="0"
        max="300"
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 text-sm">{unit}</span>
    </div>
  </div>
);

export default VitalsForm;
