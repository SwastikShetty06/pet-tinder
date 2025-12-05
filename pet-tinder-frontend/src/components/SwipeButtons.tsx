'use client';
import { RotateCcw, X, Heart } from 'lucide-react';

interface SwipeButtonsProps {
  onRewind?: () => void;
  onPass: () => void;
  onLike: () => void;
  className?: string;
}

export default function SwipeButtons({ onRewind, onPass, onLike, className = "" }: SwipeButtonsProps) {
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      {/* Rewind Button */}
      <button
        onClick={onRewind}
        className="w-12 h-12 bg-white text-amber-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!onRewind}
        title="Rewind"
      >
        <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
      </button>

      {/* Pass Button (X) */}
      <button
        onClick={onPass}
        className="w-16 h-16 bg-white text-rose-500 rounded-full flex items-center justify-center shadow-xl shadow-rose-100 hover:shadow-2xl hover:shadow-rose-200 transition-all duration-300 hover:scale-110 active:scale-95 border border-rose-50"
        title="Pass"
      >
        <X className="w-8 h-8" strokeWidth={3} />
      </button>

      {/* Like Button (Heart) */}
      <button
        onClick={onLike}
        className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover text-white rounded-full flex items-center justify-center shadow-xl shadow-pink-200 hover:shadow-2xl hover:shadow-pink-300 transition-all duration-300 hover:scale-110 active:scale-95"
        title="Like"
      >
        <Heart className="w-8 h-8 fill-current" />
      </button>
    </div>
  );
}
