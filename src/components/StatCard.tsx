import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  color: 'red' | 'blue' | 'green' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendUp,
  color
}) => {
  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      trend: trendUp ? 'text-green-600' : 'text-red-600'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      trend: trendUp ? 'text-green-600' : 'text-red-600'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      trend: trendUp ? 'text-green-600' : 'text-red-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-100',
      trend: trendUp ? 'text-green-600' : 'text-red-600'
    }
  };

  const currentColor = colorClasses[color];

  return (
    <div className={`${currentColor.bg} ${currentColor.border} border rounded-2xl p-6 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          {icon}
        </div>
        <div className={`flex items-center space-x-1 ${currentColor.trend}`}>
          {trend.includes('%') ? (
            trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />
          ) : null}
          <span className="text-sm font-medium">{trend}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-gray-500 text-sm">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;