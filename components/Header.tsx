import React from 'react';
import { Logo } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center p-4 pt-6 bg-white/80 backdrop-blur-sm border-b border-purple-500/10">
      <div className="flex items-center space-x-3">
        <Logo className="w-12 h-12" />
        <h1 className="text-4xl font-bold text-purple-600 neon-glow-purple" style={{ fontFamily: 'Poppins' }}>
          Flowtune
        </h1>
      </div>
      <p className="mt-1 text-sm text-gray-500 tracking-wider">
        Tune Your Day. Flow Your Way.
      </p>
    </header>
  );
};

export default Header;