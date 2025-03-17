
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { foodCarbonFootprint, lowCarbonRecipes } from '@/lib/data';
import { Leaf, Utensils, Calculator } from 'lucide-react';
import { useGeminiAI } from '@/hooks/useGeminiAI';

const DietPlanner = () => {
  const [selectedFoods, setSelectedFoods] = useState<number[]>([]);
  const [footprintScore, setFootprintScore] = useState<number | null>(null);
  const { askAI, response, isLoading } = useGeminiAI();

  const handleFoodSelection = (id: number) => {
    setSelectedFoods(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const calculateFootprint = () => {
    if (selectedFoods.length === 0) return;
    
    const totalEmissions = selectedFoods.reduce((total, id) => {
      const food = foodCarbonFootprint.find(f => f.id === id);
      return total + (food ? food.emissions : 0);
    }, 0);
    
    setFootprintScore(totalEmissions);
  };

  const handleGetRecommendations = async () => {
    if (selectedFoods.length === 0) return;
    
    const selectedFoodNames = selectedFoods.map(id => {
      const food = foodCarbonFootprint.find(f => f.id === id);
      return food ? food.type : '';
    }).filter(Boolean).join(', ');
    
    await askAI(`I regularly eat these foods: ${selectedFoodNames}. Can you suggest 3 specific low-carbon alternatives to reduce my carbon footprint, and briefly explain the environmental impact of each?`);
  };

  const getFootprintCategory = (score: number) => {
    if (score < 5) return { label: 'Low Impact', color: 'text-green-500' };
    if (score < 15) return { label: 'Medium Impact', color: 'text-yellow-500' };
    return { label: 'High Impact', color: 'text-red-500' };
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Carbon Footprint <span className="text-primary">Diet Planner</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Make sustainable food choices to reduce your environmental impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <GlassCard className="p-6 col-span-1 md:col-span-2 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Calculator className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Diet Carbon Calculator</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Select the foods you eat regularly to calculate your diet's carbon footprint.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {foodCarbonFootprint.map((food) => (
                  <div 
                    key={food.id} 
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedFoods.includes(food.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                    onClick={() => handleFoodSelection(food.id)}
                  >
                    <div className="text-sm font-medium mb-1">{food.type}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{food.emissions} {food.unit}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={calculateFootprint} 
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Calculate Footprint
                </button>
                
                <button 
                  onClick={handleGetRecommendations} 
                  disabled={isLoading || selectedFoods.length === 0}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Finding Alternatives...' : 'Get AI Recommendations'}
                </button>
              </div>
              
              {footprintScore !== null && (
                <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2">Your Diet Carbon Footprint:</h4>
                  <div className="flex items-center">
                    <div className="text-2xl font-bold mr-2">{footprintScore.toFixed(1)}</div>
                    <div className="text-sm">kg CO2e total</div>
                  </div>
                  <div className={`text-sm mt-1 ${getFootprintCategory(footprintScore).color}`}>
                    {getFootprintCategory(footprintScore).label}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    A typical Western diet has a footprint of around 7.4 kg CO2e per day or 2,700 kg CO2e per year.
                  </p>
                </div>
              )}
              
              {response && (
                <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold mb-2">AI-Powered Recommendations:</h4>
                  <div className="prose dark:prose-invert max-w-none text-sm">
                    {response}
                  </div>
                </div>
              )}
            </GlassCard>
            
            <GlassCard className="p-6 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Utensils className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Low-Carbon Recipes</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Delicious meal ideas with minimal environmental impact.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {lowCarbonRecipes.map((recipe) => (
                  <div key={recipe.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{recipe.name}</h4>
                    <div className="mb-2 text-xs inline-block px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
                      {recipe.carbonFootprint} Impact
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {recipe.instructions}
                    </p>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400 text-xs block mb-1">Key Ingredients:</span>
                      <div className="text-xs space-y-1">
                        {recipe.ingredients.slice(0, 5).map((ingredient, index) => (
                          <div key={index} className="flex items-center">
                            <Leaf className="w-3 h-3 text-green-500 mr-1" />
                            <span>{ingredient}</span>
                          </div>
                        ))}
                        {recipe.ingredients.length > 5 && (
                          <div className="text-primary text-xs">+ {recipe.ingredients.length - 5} more ingredients</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DietPlanner;
