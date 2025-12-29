import React, { useEffect, useState } from 'react';

const CelebrationOverlay: React.FC = () => {
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    // Stage 0: Initial Celebration (0-5s)
    // Stage 1: First line of poem (5s)
    // Stage 2: Second line of poem (8s)
    
    const timer1 = setTimeout(() => setStage(1), 5000);
    const timer2 = setTimeout(() => setStage(2), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
      {/* Background radial gradient to make text pop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80"></div>

      {/* STAGE 0: The Grand Reveal (2026 Name Happy New Year) */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out
          ${stage === 0 ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-110 pointer-events-none'}`}
      >
        <div className="animate-scale-in">
          <h1 className="font-orbitron text-8xl md:text-[12rem] font-black text-center leading-none tracking-tighter">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 drop-shadow-[0_0_30px_rgba(255,100,0,0.6)]">
              2026
            </span>
          </h1>
        </div>
        
        <div className="mt-8 md:mt-12 animate-fade-in-up opacity-0">
          <div className="relative group">
            <div className="absolute -inset-4 bg-cyan-500/20 rounded-xl blur-xl group-hover:bg-cyan-500/30 transition-all duration-500"></div>
            <h2 className="relative text-6xl md:text-9xl font-bold text-center text-white font-[Rajdhani] tracking-wide animate-neon-pulse">
              邹文莉
            </h2>
          </div>
        </div>

        <div className="mt-6 md:mt-10 animate-fade-in-up opacity-0" style={{ animationDelay: '1s' }}>
          <h3 className="text-4xl md:text-7xl font-bold text-center text-pink-500 tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] border-y-2 border-pink-500/30 py-2 md:py-4">
            新年快乐
          </h3>
        </div>
      </div>

      {/* STAGE 1 & 2: The Poem Sequence */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Line 1 */}
        <div 
          className={`transition-all duration-1000 transform ease-out mb-12 md:mb-24 relative
            ${stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
           <div className="absolute -inset-8 bg-blue-500/10 blur-[40px] rounded-full animate-pulse"></div>
           <p className="relative text-3xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-blue-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] tracking-widest text-center px-4 leading-relaxed font-[Rajdhani]">
             愿你心有山海<span className="hidden md:inline">，</span><br className="md:hidden my-2" />步履坚定
           </p>
        </div>

        {/* Line 2 */}
        <div 
          className={`transition-all duration-1000 transform ease-out delay-300 relative
            ${stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
           <div className="absolute -inset-8 bg-purple-500/10 blur-[40px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
           <p className="relative text-3xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-pink-500 drop-shadow-[0_0_20px_rgba(232,121,249,0.6)] tracking-widest text-center px-4 leading-relaxed font-[Rajdhani]">
             所求皆如愿<span className="hidden md:inline">，</span><br className="md:hidden my-2" />所行皆坦途
           </p>
        </div>

      </div>
    </div>
  );
};

export default CelebrationOverlay;
