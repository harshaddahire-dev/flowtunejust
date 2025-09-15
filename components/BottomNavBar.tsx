import React from 'react';
import { View } from '../types';
import { List, BarChart2 } from './Icons';

interface BottomNavBarProps {
  activeView: View;
  setView: (view: View) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, setView }) => {
  const navItems = [
    { view: 'timeline', icon: List, label: 'Timeline' },
    { view: 'analytics', icon: BarChart2, label: 'Analytics' },
  ];

  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 sticky bottom-0 left-0 right-0">
      <nav className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map(item => (
          <button
            key={item.view}
            onClick={() => setView(item.view as View)}
            className={`relative flex flex-col items-center justify-center w-full h-full transition-colors duration-300 ${activeView === item.view ? 'text-purple-500' : 'text-gray-500 hover:text-purple-500'}`}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
            {activeView === item.view && (
                <div className="absolute bottom-0 w-16 h-1 bg-purple-500 rounded-t-full neon-glow-purple" />
            )}
          </button>
        ))}
      </nav>
    </footer>
  );
};

export default BottomNavBar;