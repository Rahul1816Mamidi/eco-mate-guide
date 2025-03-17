
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { pmiHistoricalData } from '@/lib/data';
import GlassCard from '@/components/ui/GlassCard';

const PMIChart: React.FC = () => {
  const currentMonthData = pmiHistoricalData[pmiHistoricalData.length - 1];
  const previousMonthData = pmiHistoricalData[pmiHistoricalData.length - 2];
  const improvement = previousMonthData?.pmi && currentMonthData?.pmi 
    ? ((previousMonthData.pmi - currentMonthData.pmi) / previousMonthData.pmi) * 100
    : 0;

  return (
    <div className="max-w-3xl mx-auto mb-16">
      <div className="mb-6">
        <h3 className="text-2xl font-display font-bold mb-2">Your PMI Progress</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Track how your Plastic Mass Index has changed over time.
        </p>
      </div>

      <GlassCard className="p-6">
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-1 min-w-[140px]">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current PMI</div>
            <div className="text-3xl font-display font-bold">
              {currentMonthData?.pmi || 'N/A'}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-1 min-w-[140px]">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Monthly Change</div>
            <div className={`text-3xl font-display font-bold ${improvement > 0 ? 'text-green-500' : improvement < 0 ? 'text-red-500' : ''}`}>
              {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-1 min-w-[140px]">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Starting PMI</div>
            <div className="text-3xl font-display font-bold">
              {pmiHistoricalData[0]?.pmi || 'N/A'}
            </div>
          </div>
        </div>

        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={pmiHistoricalData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'white' 
                }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Line
                type="monotone"
                dataKey="pmi"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};

export default PMIChart;
