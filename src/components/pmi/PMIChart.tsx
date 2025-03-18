
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  ReferenceLine,
  BarChart,
  Bar
} from 'recharts';
import { pmiHistoricalData } from '@/lib/data';
import GlassCard from '@/components/ui/GlassCard';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PMIChart: React.FC = () => {
  const currentMonthData = pmiHistoricalData[pmiHistoricalData.length - 1];
  const previousMonthData = pmiHistoricalData[pmiHistoricalData.length - 2];
  const improvement = previousMonthData?.pmi && currentMonthData?.pmi 
    ? ((previousMonthData.pmi - currentMonthData.pmi) / previousMonthData.pmi) * 100
    : 0;

  const averagePMI = pmiHistoricalData.reduce((sum, item) => sum + item.pmi, 0) / pmiHistoricalData.length;
  
  // Generate the dataset for reduction goals
  const reductionGoalData = pmiHistoricalData.map(item => ({
    ...item,
    goal: Math.max(0, pmiHistoricalData[0].pmi * (1 - 0.1 * pmiHistoricalData.findIndex(d => d.month === item.month) / 12))
  }));

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

        <Tabs defaultValue="line" className="mb-4">
          <TabsList>
            <TabsTrigger value="line">Trend Line</TabsTrigger>
            <TabsTrigger value="area">Area Chart</TabsTrigger>
            <TabsTrigger value="progress">Progress vs Goal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="line" className="mt-4">
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
                  <ReferenceLine y={averagePMI} stroke="#FF8042" strokeDasharray="3 3" />
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
          </TabsContent>
          
          <TabsContent value="area" className="mt-4">
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={pmiHistoricalData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'white' 
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pmi" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary)/0.2)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="mt-4">
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={reductionGoalData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      backgroundColor: 'white' 
                    }}
                  />
                  <Legend />
                  <Bar dataKey="pmi" name="Your PMI" fill="hsl(var(--primary))" />
                  <Bar dataKey="goal" name="Target Goal" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
          <p><span className="font-medium">Analysis:</span> Your PMI score has {
            improvement > 0 
              ? `improved by ${improvement.toFixed(1)}% compared to last month.` 
              : improvement < 0 
                ? `increased by ${Math.abs(improvement).toFixed(1)}% compared to last month.`
                : `remained stable compared to last month.`
          }</p>
          <p className="mt-2"><span className="font-medium">Recommendation:</span> {
            currentMonthData?.pmi > 60 
              ? "Focus on reducing single-use plastics to significantly lower your PMI."
              : currentMonthData?.pmi > 30
                ? "You're making good progress. Consider plastic-free alternatives for everyday items."
                : "Great job maintaining a low PMI! Continue your sustainable habits."
          }</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default PMIChart;
