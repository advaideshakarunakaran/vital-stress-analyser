
import React from 'react';
import { HeartPulseIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl mx-auto text-center">
      <div className="flex justify-center items-center gap-4">
        <HeartPulseIcon className="w-10 h-10 text-cyan-400" />
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Vital Stress Analyzer
        </h1>
      </div>
      <p className="mt-3 text-lg text-slate-400">
        Get an AI-powered stress analysis based on your key health metrics.
      </p>
    </header>
  );
};

export default Header;
