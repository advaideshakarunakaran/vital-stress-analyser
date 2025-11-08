
import React, { useState, useCallback } from 'react';
import { Vitals, AnalysisResponse, User } from '../types';
import { getStressAnalysis } from '../services/geminiService';
import Header from '../components/Header';
import VitalsForm from '../components/VitalsForm';
import ResultDisplay from '../components/ResultDisplay';

interface DashboardPageProps {
  user: User;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [vitals, setVitals] = useState<Vitals>({
    heartRate: 80,
    pulseRate: 80,
    oxygenLevel: 98,
  });
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleVitalsChange = useCallback((newVitals: Partial<Vitals>) => {
    setVitals(prev => ({ ...prev, ...newVitals }));
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    // Basic validation
    if (vitals.heartRate < 30 || vitals.heartRate > 220 || 
        vitals.pulseRate < 30 || vitals.pulseRate > 220 ||
        vitals.oxygenLevel < 70 || vitals.oxygenLevel > 100) {
      setError("Please enter realistic values for all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await getStressAnalysis(vitals);
      setAnalysis(result);
    } catch (err) {
      console.error("Error getting analysis:", err);
      setError("Sorry, we couldn't analyze your vitals at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header />
      <main className="w-full mt-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <VitalsForm 
            vitals={vitals} 
            onVitalsChange={handleVitalsChange} 
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
        <div className="w-full lg:w-2/3">
          <ResultDisplay
            analysis={analysis}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <footer className="w-full text-center mt-8 text-xs text-slate-500">
        <p>Disclaimer: This tool is for informational purposes only and does not provide medical advice. Consult a healthcare professional for any health concerns.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
