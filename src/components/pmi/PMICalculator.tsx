
import React, { useState } from 'react';
import { plasticUsageExamples, plasticAlternatives } from '@/lib/data';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
import { Trash2, PlusCircle, MinusCircle, Info, Sparkles } from 'lucide-react';

interface PlasticItem {
  id: number;
  name: string;
  quantity: number;
  weight: number;
}

const PMICalculator: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<PlasticItem[]>([]);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [pmiScore, setPmiScore] = useState<number | null>(null);
  const [pmiCategory, setPmiCategory] = useState<string>('');

  const handleAddItem = (item: typeof plasticUsageExamples[0]) => {
    const existingItem = selectedItems.find(i => i.id === item.id);
    
    if (existingItem) {
      setSelectedItems(
        selectedItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        )
      );
    } else {
      setSelectedItems([
        ...selectedItems, 
        { id: item.id, name: item.name, quantity: 1, weight: item.weight }
      ]);
    }
  };

  const handleRemoveItem = (id: number) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, change: number) => {
    setSelectedItems(
      selectedItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const calculatePMI = () => {
    if (selectedItems.length === 0) {
      return;
    }

    const totalPlasticWeight = selectedItems.reduce(
      (sum, item) => sum + item.weight * item.quantity, 0
    );
    
    // This is a simplified PMI calculation for demonstration
    const score = Math.min(100, Math.round(totalPlasticWeight * 0.8));
    setPmiScore(score);
    
    // Set category based on score
    if (score < 30) {
      setPmiCategory('Low Impact');
    } else if (score < 60) {
      setPmiCategory('Moderate Impact');
    } else {
      setPmiCategory('High Impact');
    }
    
    setShowAlternatives(true);
  };

  const resetCalculator = () => {
    setSelectedItems([]);
    setShowAlternatives(false);
    setPmiScore(null);
    setPmiCategory('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Plastic Mass Index (PMI) Calculator</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your daily plastic usage and discover ways to reduce your environmental impact.
        </p>
      </div>

      <GlassCard className="p-6 mb-8">
        <h3 className="text-lg font-bold mb-4">Select Your Daily Plastic Items</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {plasticUsageExamples.map((item) => (
            <button
              key={item.id}
              onClick={() => handleAddItem(item)}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center text-center"
            >
              <div className="h-12 w-12 mb-2 flex items-center justify-center">
                {/* Placeholder for image */}
                <PlusCircle className="h-8 w-8 text-primary" />
              </div>
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{item.weight}g</span>
            </button>
          ))}
        </div>

        {selectedItems.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-bold mb-3">Your Selected Items</h4>
            <div className="space-y-3">
              {selectedItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      {item.weight}g per item
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <MinusCircle className="h-5 w-5 text-gray-500" />
                      </button>
                      
                      <span className="font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      
                      <button 
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <PlusCircle className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 rounded-full hover:bg-red-100 text-red-500"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <button
            onClick={calculatePMI}
            disabled={selectedItems.length === 0}
            className={`px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all ${
              selectedItems.length === 0 
                ? 'opacity-60 cursor-not-allowed' 
                : 'hover:bg-primary/90'
            }`}
          >
            Calculate PMI
          </button>
          
          <button
            onClick={resetCalculator}
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Reset
          </button>
        </div>
      </GlassCard>

      {pmiScore !== null && (
        <GlassCard className="p-6 mb-8 animate-scale-in">
          <div className="flex flex-col items-center">
            <Badge 
              variant={
                pmiCategory === 'Low Impact' 
                  ? 'secondary' 
                  : pmiCategory === 'Moderate Impact'
                  ? 'outline'
                  : 'destructive'
              }
              className="mb-4"
            >
              {pmiCategory}
            </Badge>
            
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-2">
              {pmiScore}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your Plastic Mass Index (PMI) Score
            </p>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ${
                  pmiCategory === 'Low Impact'
                    ? 'bg-green-500'
                    : pmiCategory === 'Moderate Impact'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${pmiScore}%` }}
              ></div>
            </div>

            <div className="flex items-start bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <Info className="h-6 w-6 text-secondary mt-1 mr-3 flex-shrink-0" />
              <p className="text-sm">
                {pmiCategory === 'Low Impact'
                  ? 'Great job! Your plastic usage is below average. Keep up the good work and explore more ways to reduce plastic.'
                  : pmiCategory === 'Moderate Impact'
                  ? 'Your plastic usage is around average. Check out the alternatives below to further reduce your environmental impact.'
                  : 'Your plastic usage is high. Consider implementing the suggested alternatives to significantly reduce your environmental footprint.'}
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {showAlternatives && (
        <GlassCard className="p-6 animate-scale-in">
          <div className="flex items-center mb-6">
            <Sparkles className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-xl font-display font-bold">
              Recommended Alternatives
            </h3>
          </div>

          <div className="space-y-6">
            {plasticAlternatives.map((item) => (
              <div key={item.id} className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0 last:pb-0">
                <h4 className="font-bold mb-3">{item.type}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.alternatives.map((alt, index) => (
                    <div 
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                    >
                      <h5 className="font-medium mb-2">{alt.name}</h5>
                      <ul className="space-y-1">
                        {alt.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default PMICalculator;
