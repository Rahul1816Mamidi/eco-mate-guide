
import React, { useEffect, useState } from 'react';
import { useGeminiAI } from '@/hooks/useGeminiAI';
import GlassCard from '@/components/ui/GlassCard';
import { Leaf, RefreshCw } from 'lucide-react';

const ecoTips = [
  "Replace single-use plastic bottles with a reusable stainless steel or glass water bottle.",
  "Use cloth grocery bags instead of plastic bags when shopping.",
  "Start a compost bin for food scraps to reduce waste and create nutrient-rich soil.",
  "Turn off lights and unplug electronics when not in use to save energy.",
  "Take shorter showers to conserve water and energy used for heating.",
  "Replace plastic straws with reusable metal, bamboo, or silicone alternatives.",
  "Use beeswax wraps instead of plastic wrap for food storage.",
  "Buy local and seasonal produce to reduce carbon emissions from transportation.",
  "Wash clothes in cold water to save energy and reduce carbon emissions.",
  "Use public transportation, carpool, bike, or walk instead of driving alone.",
  "Choose products with minimal packaging or packaging made from recycled materials.",
  "Use a reusable coffee cup instead of disposable cups when getting takeout coffee.",
  "Repair items instead of replacing them to reduce waste and consumption.",
  "Switch to LED light bulbs to reduce energy consumption and lower electricity bills.",
  "Plant native trees and plants in your garden to support local wildlife.",
  "Use natural cleaning products to reduce chemical pollution in waterways.",
  "Donate or recycle old electronics instead of throwing them in the trash.",
  "Hang clothes to dry instead of using a dryer to save energy.",
  "Use a programmable thermostat to reduce heating and cooling when you're not home.",
  "Choose recycled paper products to reduce deforestation and waste."
];

const EcoTipOfTheDay: React.FC = () => {
  const [tip, setTip] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { askAI, response } = useGeminiAI();

  const generateNewTip = async () => {
    setIsLoading(true);
    
    // First try to get a tip from Gemini AI
    await askAI("Give me ONE practical eco-friendly tip for today that helps reduce plastic waste or carbon footprint. Keep it short (30-50 words max), actionable, and positive. Format it as a single paragraph with no title or prefix.");
    
    setIsLoading(false);
  };

  useEffect(() => {
    if (response) {
      setTip(response);
    } else {
      // If no AI response or on initial load, use a random tip
      const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
      setTip(randomTip);
    }
  }, [response]);

  useEffect(() => {
    // Set initial tip on component mount
    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    setTip(randomTip);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mb-16">
      <div className="mb-6">
        <h3 className="text-2xl font-display font-bold mb-2">Eco Tip of the Day</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Daily inspiration for sustainable living.
        </p>
      </div>

      <GlassCard className="p-6">
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4 flex-shrink-0">
            <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-3 text-primary">Today's Sustainable Tip</h4>
              <p className="text-gray-700 dark:text-gray-300">
                {isLoading ? "Generating a fresh eco tip for you..." : tip}
              </p>
            </div>
            
            <button 
              onClick={generateNewTip}
              disabled={isLoading}
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              {isLoading ? 'Generating...' : 'New Tip'}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default EcoTipOfTheDay;
