
import React, { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { evModels } from '@/lib/data';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import { Battery, Car, Banknote, CircuitBoard } from 'lucide-react';

const EVComparison = () => {
  const [selectedModels, setSelectedModels] = useState<number[]>([]);
  const { askAI, response, isLoading } = useGeminiAI();

  const handleSelectModel = (id: number) => {
    setSelectedModels(prev => 
      prev.includes(id) 
        ? prev.filter(modelId => modelId !== id) 
        : [...prev, id]
    );
  };

  const handleGetRecommendation = async () => {
    if (selectedModels.length === 0) return;
    
    const selectedModelNames = selectedModels.map(id => {
      const model = evModels.find(m => m.id === id);
      return model ? `${model.brand} ${model.model}` : '';
    }).filter(Boolean).join(', ');
    
    await askAI(`Compare these electric vehicles: ${selectedModelNames}. Provide a brief comparison of their features, value for money, and which type of user each would be best for.`);
  };

  return (
    <div className="mb-12">
      <GlassCard className="p-6">
        <h2 className="text-2xl font-semibold mb-6">EV Model Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {evModels.map((model) => (
            <div 
              key={model.id}
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                selectedModels.includes(model.id) 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
              }`}
              onClick={() => handleSelectModel(model.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{model.brand} {model.model}</h3>
                  <div className="text-primary font-medium">{model.price}</div>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  Select
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <Battery className="w-5 h-5 text-gray-500 mr-2" />
                  <div className="text-sm">{model.range}</div>
                </div>
                <div className="flex items-center">
                  <CircuitBoard className="w-5 h-5 text-gray-500 mr-2" />
                  <div className="text-sm">{model.charging}</div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Highlights:</div>
                <div className="flex flex-wrap gap-2">
                  {model.highlights.map((highlight, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
              
              {model.incentives && (
                <div className="mt-4 flex items-center text-green-600 dark:text-green-400 text-sm">
                  <Banknote className="w-4 h-4 mr-1" />
                  <span>{model.incentives}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mb-6">
          <button 
            onClick={handleGetRecommendation}
            disabled={isLoading || selectedModels.length === 0}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Analyzing...' : 'Get AI-Powered Comparison'}
          </button>
        </div>
        
        {response && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-2">AI Comparison Results:</h3>
            <div className="prose dark:prose-invert max-w-none">
              {response}
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default EVComparison;
