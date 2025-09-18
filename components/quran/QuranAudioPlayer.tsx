import React, { useState, useRef, useEffect } from 'react';
import { RECITERS, getSurahAudioUrl, getReciterById } from '../../services/quranApi';

interface QuranAudioPlayerProps {
  surahNumber: number;
  surahName: string;
  onReciterChange?: (reciterId: string) => void;
  className?: string;
}

const QuranAudioPlayer: React.FC<QuranAudioPlayerProps> = ({
  surahNumber,
  surahName,
  onReciterChange,
  className = ''
}) => {
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showReciters, setShowReciters] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setError(null);
    }
  }, [surahNumber, selectedReciter]);

  const handleReciterChange = (reciterId: string) => {
    setSelectedReciter(reciterId);
    setShowReciters(false);
    if (onReciterChange) {
      onReciterChange(reciterId);
    }
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setError(null);
        
        const audioUrl = getSurahAudioUrl(surahNumber, selectedReciter);
        audioRef.current.src = audioUrl;
        
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setError('فشل في تشغيل التلاوة. يرجى المحاولة مرة أخرى.');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
    setIsLoading(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleError = () => {
    setError('فشل في تحميل التلاوة. يرجى التحقق من الاتصال بالإنترنت.');
    setIsPlaying(false);
    setIsLoading(false);
  };

  const currentReciter = getReciterById(selectedReciter);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${className}`}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
        preload="none"
      />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
            <i className="ph-fill ph-book-open text-teal-600 dark:text-teal-400 text-xl"></i>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-gray-200">{surahName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">السورة رقم {surahNumber}</p>
          </div>
        </div>
        
        {/* Reciter Selection */}
        <div className="relative">
          <button
            onClick={() => setShowReciters(!showReciters)}
            className="flex items-center space-x-2 space-x-reverse bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <img
              src={currentReciter?.image}
              alt={currentReciter?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
              {currentReciter?.name}
            </span>
            <i className={`ph ph-caret-down text-gray-500 transition-transform ${showReciters ? 'rotate-180' : ''}`}></i>
          </button>
          
          {showReciters && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-50 max-h-64 overflow-y-auto">
              {RECITERS.map((reciter) => (
                <button
                  key={reciter.id}
                  onClick={() => handleReciterChange(reciter.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    selectedReciter === reciter.id ? 'bg-teal-50 dark:bg-teal-900/50' : ''
                  }`}
                >
                  <img
                    src={reciter.image}
                    alt={reciter.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-right flex-1">
                    <p className="font-medium text-gray-800 dark:text-gray-200">{reciter.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{reciter.englishName}</p>
                  </div>
                  {selectedReciter === reciter.id && (
                    <i className="ph-fill ph-check text-teal-600 dark:text-teal-400"></i>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          disabled={!duration}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="w-12 h-12 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <i className="ph ph-spinner animate-spin text-xl"></i>
            ) : isPlaying ? (
              <i className="ph-fill ph-pause text-xl"></i>
            ) : (
              <i className="ph-fill ph-play text-xl"></i>
            )}
          </button>

          {/* Download Button */}
          <button
            onClick={() => {
              const audioUrl = getSurahAudioUrl(surahNumber, selectedReciter);
              const link = document.createElement('a');
              link.href = audioUrl;
              link.download = `${surahName}-${currentReciter?.name}.mp3`;
              link.click();
            }}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-full flex items-center justify-center transition-colors"
            title="تحميل التلاوة"
          >
            <i className="ph ph-download text-lg"></i>
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 space-x-reverse">
          <i className="ph ph-speaker-high text-gray-500 dark:text-gray-400"></i>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #0d9488;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #0d9488;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default QuranAudioPlayer;