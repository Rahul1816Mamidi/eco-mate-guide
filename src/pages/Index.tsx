
import React from 'react';
import Header from '@/components/layout/Header';
import PMICalculator from '@/components/pmi/PMICalculator';
import EcoTipOfTheDay from '@/components/pmi/EcoTipOfTheDay';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Measure Your <span className="text-primary">Plastic Impact</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Track your plastic usage and discover eco-friendly alternatives for a more sustainable lifestyle.
            </p>
          </div>
          
          <PMICalculator />
          <EcoTipOfTheDay />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
