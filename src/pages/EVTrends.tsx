
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { evModels } from '@/lib/data';
import { Car, Battery, Zap } from 'lucide-react';
import EVComparison from '@/components/ev/EVComparison';
import { useGeminiAI } from '@/hooks/useGeminiAI';

const EVTrends = () => {
  const { askAI, response, isLoading } = useGeminiAI();
  const [showAIResponse, setShowAIResponse] = useState(false);

  const handleAskForRecommendation = async () => {
    await askAI("What are the top 3 benefits of switching to an electric vehicle? Include environmental impact, cost savings, and performance aspects.");
    setShowAIResponse(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Electric Vehicle <span className="text-primary">Trends</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Explore the latest affordable electric vehicles and make a sustainable choice for your next car.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <GlassCard className="p-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Affordable Options</h3>
                <p className="text-gray-600 dark:text-gray-400">Discover electric vehicles that fit your budget without compromising on quality.</p>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Battery className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Range & Battery</h3>
                <p className="text-gray-600 dark:text-gray-400">Compare range capabilities and battery technologies of different EV models.</p>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Charging Infrastructure</h3>
                <p className="text-gray-600 dark:text-gray-400">Learn about the expanding network of charging stations and home setup options.</p>
              </div>
            </GlassCard>
          </div>
          
          <EVComparison />
          
          <GlassCard className="p-6 mb-12 max-w-3xl mx-auto animate-scale-in">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI EV Insights</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get AI-powered insights on the benefits of switching to an electric vehicle.
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <button 
                onClick={handleAskForRecommendation} 
                disabled={isLoading}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Thinking...' : 'Get AI Recommendations'}
              </button>
              
              {response && showAIResponse && (
                <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                  <div className="bg-primary/10 p-4 border-b border-gray-200 dark:border-gray-800">
                    <h4 className="font-bold text-lg text-primary">EV Benefits Analysis</h4>
                  </div>
                  <div className="p-6">
                    <div 
                      className="prose dark:prose-invert prose-headings:text-primary prose-headings:font-semibold prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-li:text-gray-600 dark:prose-li:text-gray-400 max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: response
                          .replace(/\*\*([^*]+)\*\*/g, '<span class="font-semibold text-primary">$1</span>')
                          .replace(/\*([^*]+)\*/g, '<em>$1</em>')
                          .replace(/### ([^\n]+)/g, '<h3 class="text-lg font-bold mt-4 mb-2 text-primary">$1</h3>')
                          .replace(/## ([^\n]+)/g, '<h2 class="text-xl font-bold mt-5 mb-3 text-primary">$1</h2>')
                          .replace(/\n\n/g, '</p><p>')
                          .replace(/\n/g, '<br/>')
                          .replace(/• ([^\n]+)/g, '<div class="flex ml-2 mb-2"><div class="text-primary mr-2 mt-1">•</div><div>$1</div></div>')
                      }} 
                    />
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EVTrends;

