import React, { useState } from 'react';
import { generateFuturePrediction } from '../services/geminiService';

const PredictionModal: React.FC = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = async () => {
    setIsOpen(true);
    if (prediction) return; // Already generated

    setLoading(true);
    const result = await generateFuturePrediction();
    setPrediction(result);
    setLoading(false);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="mt-12 text-center">
        <button
          onClick={handleGenerate}
          className="relative group px-8 py-4 bg-transparent overflow-hidden rounded-lg transition-all duration-300 hover:scale-105"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="absolute inset-0 border border-cyan-500/50 rounded-lg group-hover:border-pink-500/50 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]"></div>
          <span className="relative font-orbitron text-cyan-100 tracking-widest uppercase text-sm md:text-base font-bold group-hover:text-white transition-colors">
            Reveal 2026 Prophecy
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>
          
          <div className="relative w-full max-w-lg bg-[#0a0a12] border border-purple-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(147,51,234,0.2)] transform transition-all animate-[fadeIn_0.3s_ease-out]">
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-500"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-purple-500"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-pink-500"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-blue-500"></div>

            <h3 className="font-orbitron text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold mb-6 text-center">
              Timeline: 2026
            </h3>

            <div className="min-h-[100px] flex items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-purple-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
                  <p className="text-gray-400 text-sm font-mono animate-pulse">Consulting the oracle...</p>
                </div>
              ) : (
                <p className="text-lg md:text-xl text-center text-gray-200 leading-relaxed font-light">
                  "{prediction}"
                </p>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={closeModal}
                className="px-6 py-2 rounded-full border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider"
              >
                Close Link
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PredictionModal;
