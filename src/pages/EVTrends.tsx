
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { evModels } from '@/lib/data';
import { Car, Battery, Zap } from 'lucide-react';
import EVComparison from '@/components/ev/EVComparison';

const EVTrends = () => {
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
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EVTrends;
