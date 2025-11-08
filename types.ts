export interface Vitals {
  heartRate: number;
  pulseRate: number;
  oxygenLevel: number;
}

export interface AnalysisResponse {
  stressPercentage: number;
  analysis: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  profilePictureUrl?: string;
  activityHistory: { date: string; action: string; details: string }[];
}

export interface AdminHistoryItem {
  id: number;
  action: string;
  details: string;
  adminName: string;
  timestamp: string;
  icon: 'ban' | 'delete' | 'backup' | 'audit';
}