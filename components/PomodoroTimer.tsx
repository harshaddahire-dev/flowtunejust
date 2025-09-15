import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RefreshCw } from './Icons';

const PomodoroTimer: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    if (minutes === 0 && seconds === 0) return;
    setIsActive(true);
    intervalRef.current = window.setInterval(() => {
        setSeconds(prevSeconds => {
            if (prevSeconds > 0) {
                return prevSeconds - 1;
            } else {
                setMinutes(prevMinutes => {
                    if (prevMinutes > 0) {
                        return prevMinutes - 1;
                    } else {
                        return 0;
                    }
                });
                return 59;
            }
        });
    }, 1000);
  }, [minutes, seconds]);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }
  }, []);

  const resetTimer = useCallback(() => {
    pauseTimer();
    setMinutes(25);
    setSeconds(0);
  }, [pauseTimer]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0 && isActive) {
      pauseTimer();
      // Optional: Play a sound
    }
  }, [minutes, seconds, isActive, pauseTimer]);
  
  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if(intervalRef.current) clearInterval(intervalRef.current);
    }
  }, []);


  return (
    <div className="bg-white p-4 rounded-lg flex items-center justify-between purple-box-shadow mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-800">Pomodoro Timer</h3>
        <p className="text-4xl font-mono tracking-tighter text-purple-500 neon-glow-purple my-1">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={resetTimer} className="p-2 text-gray-500 hover:text-purple-500 transition-colors">
            <RefreshCw className="w-5 h-5"/>
        </button>
        <button 
            onClick={isActive ? pauseTimer : startTimer} 
            className="p-3 bg-purple-500 text-white rounded-full purple-button-shadow transition-transform hover:scale-105 active:scale-95">
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;