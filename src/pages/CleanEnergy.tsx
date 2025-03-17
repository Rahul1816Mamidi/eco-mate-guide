
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { solarPanelOptions, roofGardenPlants } from '@/lib/data';
import { Sun, Flower, AreaChart } from 'lucide-react';
import { useGeminiAI } from '@/hooks/useGeminiAI';

const CleanEnergy = () => {
  const { askAI, response, isLoading } = useGeminiAI();

  const handleAskForRecommendation = async () => {
    await askAI("What are 3 simple ways to make my home more energy efficient?");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Clean Energy <span className="text-primary">Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover sustainable energy practices for your home and community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <GlassCard className="p-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Sun className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Solar Energy Solutions</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Harness the power of the sun with efficient solar panel options for your home.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {solarPanelOptions.map((option) => (
                  <div key={option.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{option.type}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Efficiency:</span> {option.efficiency}
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Lifespan:</span> {option.lifespan}
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500 dark:text-gray-400">Cost:</span> {option.cost}
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500 dark:text-gray-400">Best For:</span> {option.bestFor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Flower className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Green Roof Gardening</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Transform your rooftop into a sustainable garden that improves insulation and air quality.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {roofGardenPlants.map((plant) => (
                  <div key={plant.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{plant.name}</h4>
                    <div className="mb-2">
                      <span className="text-gray-500 dark:text-gray-400">Care Level:</span> {plant.care}
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400 block mb-1">Benefits:</span>
                      <ul className="list-disc list-inside text-sm pl-2">
                        {plant.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
          
          <GlassCard className="p-6 mb-8 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <AreaChart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI Energy Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get personalized AI-powered recommendations for improving your home's energy efficiency.
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <button 
                onClick={handleAskForRecommendation} 
                disabled={isLoading}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Thinking...' : 'Get Energy Efficiency Tips'}
              </button>
              
              {response && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2">Energy Efficiency Recommendations:</h4>
                  <div className="prose dark:prose-invert max-w-none">
                    {response}
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

export default CleanEnergy;
