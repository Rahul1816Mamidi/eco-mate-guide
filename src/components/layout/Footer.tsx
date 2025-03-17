
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <h2 className="text-xl font-display font-bold">EcoMate</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Empowering sustainable living through innovative solutions. Together, we can make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/ev-trends" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  EV Trends
                </Link>
              </li>
              <li>
                <Link to="/clean-energy" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Clean Energy
                </Link>
              </li>
              <li>
                <Link to="/diet-planner" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm transition-colors">
                  Diet Planner
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} EcoMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
