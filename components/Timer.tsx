import React, { useState, useEffect, useRef } from 'react';
import { TimeLeft } from '../types';

interface TimerProps {
  targetDate: number;
  onPhaseChange: (phase: 'normal' | 'climax' | 'celebration') => void;
}

const Timer: React.FC<TimerProps> = ({ targetDate, onPhaseChange }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [totalSeconds, setTotalSeconds] = useState<number>(100);
  
  const currentPhase = useRef<'normal' | 'climax' | 'celebration'>('normal');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      const totalSec = Math.ceil(difference / 1000); // Use ceil to prevent showing 0 before switching

      setTotalSeconds(totalSec);

      // Phase detection
      let nextPhase: 'normal' | 'climax' | 'celebration' = 'normal';
      if (difference <= 0) {
        nextPhase = 'celebration';
      } else if (totalSec <= 10) {
        nextPhase = 'climax';
      } else {
        nextPhase = 'normal';
      }

      if (nextPhase !== currentPhase.current) {
        currentPhase.current = nextPhase;
        onPhaseChange(nextPhase);
      }

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 50); // Faster update for precision

    return () => clearInterval(timer);
  }, [targetDate, onPhaseChange]);

  const isClimax = totalSeconds <= 10 && totalSeconds > 0;

  // Render the giant countdown for the last 10 seconds
  if (isClimax) {
    return (
      <div className="relative flex justify-center items-center w-full h-[40vh]">
        {/* Background pulsing effect */}
        <div className="absolute inset-0 bg-red-500/10 blur-[100px] animate-pulse rounded-full"></div>
        
        {/* Giant Number */}
        <div className="relative z-20 font-orbitron font-black text-[12rem] md:text-[20rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-orange-600 drop-shadow-[0_0_50px_rgba(220,38,38,0.8)] animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]">
          {totalSeconds}
        </div>
        
        {/* Static Overlay for legibility over the ping animation */}
        <div className="absolute z-20 font-orbitron font-black text-[12rem] md:text-[20rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-red-200 to-red-500 mix-blend-overlay">
          {totalSeconds}
        </div>
      </div>
    );
  }

  // Normal rendering (Days/Hours/Min/Sec)
  const TimeUnit = ({ value, label, colorClass }: { value: number; label: string; colorClass: string }) => (
    <div className="flex flex-col items-center mx-1 md:mx-4">
      <div className="relative group">
        <div className={`absolute -inset-1 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-200 ${colorClass}`}></div>
        
        <div className="relative w-16 h-20 md:w-32 md:h-40 bg-[#0e0e16] border border-white/10 rounded-lg flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
          {/* Scanline effect - Removed blue tint to be purely grayscale */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01),rgba(255,255,255,0.03))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none"></div>
          
          <span className="font-orbitron text-3xl md:text-7xl font-bold tracking-tighter z-20 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="mt-2 md:mt-4 text-[10px] md:text-sm uppercase tracking-[0.2em] font-medium text-gray-400">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center items-center p-4">
      <TimeUnit value={timeLeft.days} label="Days" colorClass="bg-gradient-to-r from-indigo-500 to-purple-500" />
      <TimeUnit value={timeLeft.hours} label="Hours" colorClass="bg-gradient-to-r from-purple-500 to-pink-500" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" colorClass="bg-gradient-to-r from-pink-500 to-rose-500" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" colorClass="bg-gradient-to-r from-rose-500 to-orange-500" />
    </div>
  );
};

export default Timer;