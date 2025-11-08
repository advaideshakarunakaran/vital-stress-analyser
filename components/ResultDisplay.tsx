
import React from 'react';
import { AnalysisResponse } from '../types';
import StressGauge from './StressGauge';

interface ResultDisplayProps {
  analysis: AnalysisResponse | null;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ analysis, isLoading, error }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700 h-full flex flex-col items-center justify-center min-h-[360px]">
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && !analysis && <InitialMessage />}
      {!isLoading && !error && analysis && (
        <div className="w-full flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="flex-shrink-0">
            <StressGauge percentage={analysis.stressPercentage} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Analysis</h3>
            <p className="text-slate-300 leading-relaxed">{analysis.analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-slate-400">
    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg">Analyzing your vitals...</p>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center text-red-400">
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p className="mt-4 text-lg font-semibold">An Error Occurred</p>
    <p className="text-sm">{message}</p>
  </div>
);

const InitialMessage: React.FC = () => (
  <div className="text-center text-slate-500">
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
    <p className="mt-4 text-lg">Your analysis will appear here.</p>
    <p className="text-sm">Enter your vitals and click "Analyze".</p>
  </div>
);

export default ResultDisplay;
