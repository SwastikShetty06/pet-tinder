'use client';
import TinderCard from 'react-tinder-card';
import { forwardRef, useImperativeHandle, useRef, useEffect, useCallback, useState } from 'react';
import { MapPin, Calendar, Ruler, Info, Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PetCard = forwardRef(({ pet, onSwipe }: any, ref) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<any>(null);
  const isMountedRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

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
      <motion.div
        className={`relative w-80 h-[600px] rounded-[2rem] shadow-2xl overflow-hidden bg-white transition-all duration-300 ease-out ${isAnimating ? 'scale-95 opacity-50' : 'hover:scale-105 hover:shadow-pink-200/50'}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Pet Image */}
        <div className="relative h-3/5 overflow-hidden group">
          {pet.images?.[0] ? (
            <img
              src={pet.images[0]}
              alt={pet.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-300 to-purple-500">
              <div className="text-center">
                <span className="text-8xl block mb-4 animate-bounce">
                  {getSpeciesEmoji(pet.species)}
                </span>
                <p className="text-white font-bold text-xl drop-shadow-md">
                  Photo Unavailable
                </p>
              </div>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          {/* Featured Badge */}
          <div className="absolute top-6 left-6">
            <span className="glass px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1.5 backdrop-blur-md bg-white/20 border-white/30">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              Featured
            </span>
          </div>

          {/* Liked Icon */}
          <div className="absolute top-6 right-6">
            <div className="w-10 h-10 glass rounded-full flex items-center justify-center shadow-lg backdrop-blur-md bg-white/20 border-white/30 transition-transform active:scale-90">
              <Heart className="w-5 h-5 text-white fill-white/50" />
            </div>
          </div>
        </div>

        {/* Pet Info Section */}
        <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-white p-6 flex flex-col justify-between rounded-t-[2rem] -mt-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <div>
            {/* Name and Age */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-3xl font-black text-slate-800 font-heading leading-tight">
                  {pet.name}
                </h2>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mt-1">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-600 uppercase tracking-wide text-xs">
                    {pet.species}
                  </span>
                  <span>•</span>
                  <span>{pet.gender || 'Unknown'}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-bold text-primary font-heading">
                  {pet.age}
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Years</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-sm text-slate-500 mb-4">
              <MapPin className="w-4 h-4 mr-1.5 text-secondary" />
              <span>{pet.location || 'San Francisco, CA'}</span>
            </div>

            {/* Tags/Attributes */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
              <span className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-bold whitespace-nowrap">
                Playful
              </span>
              <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-bold whitespace-nowrap">
                {pet.size || 'Medium'}
              </span>
              <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-bold whitespace-nowrap">
                Vaccinated
              </span>
            </div>
          </div>

          {/* Bio Preview */}
          {pet.bio && (
            <div className="relative">
              <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                {pet.bio}
              </p>
              <div className="absolute bottom-0 right-0 bg-gradient-to-l from-white via-white to-transparent w-12 h-full" />
            </div>
          )}
        </div>
      </motion.div>
    </TinderCard>
  );
});

PetCard.displayName = 'PetCard';

export default PetCard;
