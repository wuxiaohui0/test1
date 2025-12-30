import React, { useState, useEffect, useRef } from 'react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // PLAYLIST CONFIGURATION
  // The user requested "Happy New Year" by ABBA (identified by lyrics).
  const TRACKS = [
    "luck.mp3", // Priority 1: Local file (Please rename your file to this)
    // "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_04_-_Sentinel.mp3" // Priority 5: Instrumental Fallback
  ];

  useEffect(() => {
    // Cleanup previous audio if it exists
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
    }

    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const currentUrl = TRACKS[trackIndex];
    console.log(`🎵 Initializing Music Player. Trying Track [${trackIndex}]: ${currentUrl}`);

    const handleError = (e: Event) => {
      console.warn(`⚠️ Track failed to load: ${currentUrl}`);
      // Try next track if available
      if (trackIndex < TRACKS.length - 1) {
        console.log("🔄 Switching to next available source...");
        setTrackIndex(prev => prev + 1);
      } else {
        console.error("❌ All fallback music sources failed.");
      }
    };

    audio.addEventListener('error', handleError);
    audio.src = currentUrl;

    // Attempt autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log(`✅ Playing: ${currentUrl}`);
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("⏸️ Autoplay prevented by browser. Waiting for user interaction.", error);
          setIsPlaying(false);
        });
    }

    return () => {
      audio.removeEventListener('error', handleError);
      audio.pause();
      audioRef.current = null;
    };
  }, [trackIndex]); // Re-run when trackIndex changes

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className={`fixed top-6 left-6 z-[60] flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-sm transition-all duration-300 group
        ${isPlaying 
          ? 'bg-yellow-500/20 border-yellow-500/50 hover:bg-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.3)]' 
          : 'bg-black/20 border-white/10 hover:bg-white/10 hover:border-white/30'
        }`}
      aria-label={isPlaying ? "Pause Music" : "Play Music"}
      title={isPlaying ? "Pause Happy New Year" : "Play Happy New Year"}
    >
      {isPlaying ? (
        <div className="flex items-end justify-center gap-1 h-5 pb-1">
          {/* Visualizer bars - Slowed down for the ballad tempo of "Happy New Year" */}
          <span className="w-1 bg-yellow-400 rounded-t animate-[musicBar_0.8s_ease-in-out_infinite]"></span>
          <span className="w-1 bg-orange-400 rounded-t animate-[musicBar_1.0s_ease-in-out_infinite] delay-75"></span>
          <span className="w-1 bg-amber-300 rounded-t animate-[musicBar_0.6s_ease-in-out_infinite] delay-150"></span>
          <span className="w-1 bg-yellow-400 rounded-t animate-[musicBar_0.9s_ease-in-out_infinite]"></span>
        </div>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      )}
      
      <style>{`
        @keyframes musicBar {
          0%, 100% { height: 4px; }
          50% { height: 18px; }
        }
      `}</style>
    </button>
  );
};

export default MusicPlayer;
