'use client';

interface SwipeButtonsProps {
  onRewind?: () => void;
  onPass: () => void;
  onLike: () => void;
  className?: string;
}

export default function SwipeButtons({ onRewind, onPass, onLike, className = "" }: SwipeButtonsProps) {
  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      {/* Rewind Button */}
      <button
        onClick={onRewind}
        className="w-12 h-12 bg-white hover:bg-gray-50 text-yellow-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 border border-gray-200"
        disabled={!onRewind}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
        </svg>
      </button>

      {/* Pass Button (X) */}
      <button
        onClick={onPass}
        className="w-14 h-14 bg-white hover:bg-gray-50 text-red-500 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 border-2 border-red-100"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Like Button (Heart) */}
      <button
        onClick={onLike}
        className="w-14 h-14 bg-white hover:bg-gray-50 text-green-500 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 border-2 border-green-100"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>
  );
}
