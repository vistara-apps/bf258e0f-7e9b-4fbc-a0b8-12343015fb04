'use client';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricsCard({ title, value, subtitle, icon, trend }: MetricsCardProps) {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-white text-opacity-70',
  };

  return (
    <div className="metric-card animate-scale-in">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-white text-opacity-80">{title}</h3>
        {icon && <div className="text-white text-opacity-60">{icon}</div>}
      </div>
      
      <div className="text-2xl font-bold text-white mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      
      {subtitle && (
        <p className={`text-sm ${trend ? trendColors[trend] : 'text-white text-opacity-70'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
