
import React from 'react';
import { User } from '../types';
import { mockUser, mockAdmin } from '../data/mock';
import { HeartPulseIcon, UserIcon, ShieldCheckIcon } from '../components/Icons';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-4">
                <HeartPulseIcon className="w-10 h-10 text-cyan-400" />
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Vital Stress Analyzer
                </h1>
            </div>
            <p className="mt-3 text-lg text-slate-400">
                Please sign in to continue
            </p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-700">
            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
                    <input type="email" id="email" className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 text-base rounded-md block p-3 focus:ring-cyan-500 focus:border-cyan-500" placeholder="you@example.com" defaultValue="demo@example.com" />
                </div>
                <div>
                    <label htmlFor="password"className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                    <input type="password" id="password" className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 text-base rounded-md block p-3 focus:ring-cyan-500 focus:border-cyan-500" placeholder="••••••••" defaultValue="password" />
                </div>
            </div>
            <div className="mt-8 space-y-4">
                <button
                    onClick={() => onLogin(mockUser)}
                    className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    <UserIcon className="w-5 h-5"/>
                    Login as User
                </button>
                 <button
                    onClick={() => onLogin(mockAdmin)}
                    className="w-full flex items-center justify-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                    <ShieldCheckIcon className="w-5 h-5"/>
                    Login as Admin
                </button>
            </div>
            <p className="text-center text-xs text-slate-500 mt-6">
                This is a simulated login. No credentials are checked.
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
