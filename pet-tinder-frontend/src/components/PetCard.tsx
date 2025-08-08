'use client';
import TinderCard from 'react-tinder-card';
import { forwardRef, useImperativeHandle, useRef, useEffect, useCallback, useState } from 'react';

const PetCard = forwardRef(({ pet, onSwipe }: any, ref) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<any>(null);
  const isMountedRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      // Clear any pending timeouts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // Expose swipe method to parent through ref
  useImperativeHandle(ref, () => ({
    swipe: (direction: 'left' | 'right') => {
      if (cardRef.current && isMountedRef.current) {
        cardRef.current.swipe(direction);
      }
    }
  }), []);

  const handleSwipe = useCallback((direction: string) => {
    if (!isMountedRef.current) return;
    
    setIsAnimating(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    timeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        try {
          onSwipe(pet._id, direction === 'right' ? 'like' : 'pass');
        } catch (error) {
          console.error('Error in onSwipe callback:', error);
        } finally {
          if (isMountedRef.current) {
            setIsAnimating(false);
          }
        }
      }
    }, 300);
  }, [pet._id, onSwipe]);

  const getSpeciesEmoji = (species: string) => {
    const s = species?.toLowerCase() || '';
    if (s.includes('dog')) return '🐕';
    if (s.includes('cat')) return '🐱';
    if (s.includes('bird')) return '🦜';
    if (s.includes('rabbit')) return '🐰';
    if (s.includes('hamster')) return '🐹';
    if (s.includes('fish')) return '🐠';
    return '🐾';
  };

  return (
    <TinderCard
      ref={cardRef}
      onSwipe={handleSwipe}
      preventSwipe={['up', 'down']}
      className="absolute cursor-grab active:cursor-grabbing"
    >
      <div className={`relative w-80 h-[600px] rounded-3xl shadow-lg overflow-hidden bg-white transition-transform duration-300 ease-in-out ${isAnimating ? 'scale-95' : 'hover:scale-105'}`}>
        {/* Pet Image */}
        <div className="relative h-4/6 overflow-hidden">
          {pet.images?.[0] ? (
            <img
              src={pet.images[0]}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-300 to-purple-500">
              <div className="text-center">
                <span className="text-7xl block mb-2">
                  {getSpeciesEmoji(pet.species)}
                </span>
                <p className="text-white font-semibold text-lg">
                  Photo Unavailable
                </p>
              </div>
            </div>
          )}

          {/* Featured Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-pink-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              🌟 Featured
            </span>
          </div>

          {/* Liked Icon */}
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-lg">💖</span>
            </div>
          </div>
        </div>

        {/* Pet Info Section */}
        <div className="p-6 space-y-3">
          {/* Name and Age */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {pet.name}
            </h2>
            <div className="flex items-center text-gray-600">
              <span className="text-sm mr-1">📅</span>
              <span className="text-sm font-medium">{pet.age} yrs</span>
            </div>
          </div>

          {/* Species and Gender */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>
              {pet.species} • {pet.gender || 'Unknown'} • {pet.size || 'Medium'}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">📍</span>
            <span>{pet.location || 'San Francisco, CA'}</span>
          </div>

          {/* Weight */}
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-1">⚖️</span>
            <span>{pet.weight || '28'} kg</span>
          </div>

          {/* Bio */}
          {pet.bio && (
            <p className="text-gray-600 text-sm leading-relaxed">
              {pet.bio.substring(0, 80)}{pet.bio.length > 80 ? '...' : ''}
            </p>
          )}
        </div>

      </div>
    </TinderCard>
  );
});

PetCard.displayName = 'PetCard';

export default PetCard;
