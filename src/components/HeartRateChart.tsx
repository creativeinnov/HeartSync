import React from 'react';

interface HeartRateData {
  time: string;
  value: number;
}

interface HeartRateChartProps {
  data: HeartRateData[];
}

const HeartRateChart: React.FC<HeartRateChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  
  const chartHeight = 200;
  const chartWidth = 500;
  
  // Generate SVG path
  const generatePath = () => {
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((point.value - minValue) / range) * chartHeight;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  // Generate area path (for gradient fill)
  const generateAreaPath = () => {
    const points = data.map((point, index) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((point.value - minValue) / range) * chartHeight;
      return [x, y];
    });
    
    const pathData = points.map((point, index) => 
      index === 0 ? `M ${point[0]},${point[1]}` : `L ${point[0]},${point[1]}`
    ).join(' ');
    
    return `${pathData} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;
  };

  return (
    <div className="w-full">
      <div className="relative">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
          className="w-full h-64"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <line
              key={index}
              x1="0"
              y1={chartHeight * ratio}
              x2={chartWidth}
              y2={chartHeight * ratio}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Area fill */}
          <path
            d={generateAreaPath()}
            fill="url(#heartGradient)"
          />
          
          {/* Main line */}
          <path
            d={generatePath()}
            fill="none"
            stroke="#EF4444"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * chartWidth;
            const y = chartHeight - ((point.value - minValue) / range) * chartHeight;
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#EF4444"
                  className="hover:r-6 transition-all duration-200 cursor-pointer"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="2"
                  fill="white"
                />
              </g>
            );
          })}
          
          {/* X-axis labels */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * chartWidth;
            return (
              <text
                key={index}
                x={x}
                y={chartHeight + 20}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {point.time}
              </text>
            );
          })}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <div>
          <span className="font-medium">Range: </span>
          <span>{minValue} - {maxValue} BPM</span>
        </div>
        <div>
          <span className="font-medium">Average: </span>
          <span>{Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length)} BPM</span>
        </div>
      </div>
    </div>
  );
};

export default HeartRateChart;