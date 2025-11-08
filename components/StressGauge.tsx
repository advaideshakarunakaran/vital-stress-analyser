
import React from 'react';

interface StressGaugeProps {
  percentage: number;
}

const StressGauge: React.FC<StressGaugeProps> = ({ percentage }) => {
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = (p: number) => {
    if (p < 40) return '#4ade80'; // green-400
    if (p < 70) return '#facc15'; // yellow-400
    return '#f87171'; // red-400
  };

  const color = getColor(percentage);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-slate-700"
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out, stroke 0.8s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold" style={{ color: color, transition: 'color 0.8s ease' }}>
          {percentage}
        </span>
        <span className="text-sm text-slate-400">Stress</span>
      </div>
    </div>
  );
};

export default StressGauge;
