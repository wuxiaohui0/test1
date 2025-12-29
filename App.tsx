import React, { useState, useCallback, useEffect } from 'react';
import Background from './components/Background';
import Timer from './components/Timer';
import PredictionModal from './components/PredictionModal';
import Fireworks from './components/Fireworks';
import CelebrationOverlay from './components/CelebrationOverlay';
import MusicPlayer from './components/MusicPlayer';

const App: React.FC = () => {
  // New state to track if user has clicked "Start"
  const [hasStarted, setHasStarted] = useState(false);
  const [phase, setPhase] = useState<'normal' | 'climax' | 'celebration'>('normal');
  
  // Initialize with a target date 11 seconds into the future to trigger the finale immediately
  const [targetDate, setTargetDate] = useState<number>(() => new Date().getTime() + 11000);
  
  const handlePhaseChange = useCallback((newPhase: 'normal' | 'climax' | 'celebration') => {
    setPhase(newPhase);
  }, []);

  // Allow resetting the experience
  const resetExperience = () => {
    setPhase('normal');
    setTargetDate(new Date().getTime() + 11000);
  };

  // Start Screen Component
  if (!hasStarted) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50 overflow-hidden font-orbitron">
        <Background />
        
        <div className="relative z-10 flex flex-col items-center animate-[fadeInUp_1s_ease-out]">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-8 tracking-widest drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            PROJECT 2026
          </h1>
          
          <button 
            onClick={() => setHasStarted(true)}
            className="group relative px-12 py-6 bg-transparent overflow-hidden rounded-none transition-all duration-300 hover:scale-105"
          >
            {/* Button Borders */}
            <div className="absolute inset-0 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>
            
            {/* Button Background & Text */}
            <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors"></div>
            <span className="relative text-xl md:text-2xl font-bold text-cyan-100 tracking-[0.3em] uppercase group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
              Initialize System
            </span>
          </button>
          
          <p className="mt-6 text-gray-500 text-xs uppercase tracking-widest animate-pulse">
            Audio & Visual Experience Required
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen text-white flex flex-col items-center justify-center overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-1000 
      ${phase === 'climax' ? 'bg-[#1a0505]' : ''} 
      ${phase === 'celebration' ? 'bg-black' : ''}`}>
      
      {/* Background Music Player - Mounts only after user interaction (click), ensuring autoplay works */}
      <MusicPlayer />

      {/* Permanent Reset Button (Top Right) */}
      <button
        onClick={resetExperience}
        className="fixed top-6 right-6 z-[60] group flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110"
        aria-label="Reset Experience"
        title="Reset Animation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 group-hover:rotate-180 transition-all duration-700 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {phase === 'celebration' ? <Fireworks /> : <Background />}
      
      {phase === 'celebration' && <CelebrationOverlay />}

      {/* Main Content - Hides during celebration */}
      <main className={`relative z-10 flex flex-col items-center w-full max-w-6xl px-4 py-12 transition-opacity duration-500 ${phase === 'celebration' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Header Section */}
        <header className={`mb-8 md:mb-12 text-center transition-all duration-500 ${phase === 'climax' ? 'scale-110' : ''}`}>
          <div className={`inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border backdrop-blur-sm transition-colors duration-300
            ${phase === 'climax' ? 'bg-red-900/30 border-red-500/50' : 'bg-white/5 border-white/10'}`}>
            <span className={`w-2 h-2 mr-2 rounded-full animate-pulse ${phase === 'climax' ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-green-500'}`}></span>
            <span className={`text-xs font-bold tracking-widest uppercase ${phase === 'climax' ? 'text-red-200' : 'text-gray-300'}`}>
              {phase === 'climax' ? 'FINAL SEQUENCE' : 'System Online'}
            </span>
          </div>
          
          <h1 className="font-orbitron text-5xl md:text-8xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            2026
          </h1>
          <p className={`text-lg md:text-xl tracking-[0.5em] font-light uppercase transition-colors duration-300 ${phase === 'climax' ? 'text-red-400 animate-pulse font-bold' : 'text-gray-400'}`}>
            {phase === 'climax' ? 'T-MINUS' : 'Countdown Initiated'}
          </p>
        </header>

        {/* Countdown Section */}
        <section className="w-full mb-16 relative flex justify-center">
          {phase === 'climax' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 blur-[120px] animate-pulse pointer-events-none rounded-full"></div>
          )}
          <Timer targetDate={targetDate} onPhaseChange={handlePhaseChange} />
        </section>

        {/* Interactive Feature - Only visible in normal mode, hidden during climax for focus */}
        <section className={`w-full flex flex-col items-center transition-all duration-500 ${phase !== 'normal' ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100'}`}>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-8 opacity-30"></div>
          <PredictionModal />
        </section>
      </main>

      {/* Replay Button - Only visible after celebration sequence (10s delay) */}
      {phase === 'celebration' && (
        <button 
          onClick={resetExperience}
          className="fixed bottom-10 z-[60] px-6 py-2 rounded-full border border-white/20 bg-black/40 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all uppercase tracking-widest text-sm backdrop-blur-md animate-[fadeIn_2s_ease-out_10s_forwards] opacity-0"
        >
          Replay Sequence
        </button>
      )}
      
      {/* Decorative Gradients */}
      <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none transition-opacity ${phase === 'climax' ? 'opacity-0' : 'opacity-100'}`}></div>
    </div>
  );
};

export default App;