
import React, { useEffect, useState } from 'react';

interface ConfettiProps {
    onComplete: () => void;
}

const confettiColors = [
  '#22d3ee', // cyan-400
  '#818cf8', // indigo-400
  '#f472b6', // pink-400
  '#a78bfa', // violet-400
];

const Confetti: React.FC<ConfettiProps> = ({ onComplete }) => {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        transform: `rotate(${Math.random() * 360}deg)`,
        animationDuration: `${Math.random() * 1 + 0.5}s`,
        animationDelay: `${Math.random() * 0.2}s`,
      },
    }));
    setPieces(newPieces);

    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="absolute w-2 h-4 animate-confetti-fall"
          style={piece.style}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(200px) rotate(720deg); opacity: 0; }
        }
        .animate-confetti-fall {
          animation-name: confetti-fall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default Confetti;
