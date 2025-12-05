'use client';
import useSWR from 'swr';
import PetCard from '@/components/PetCard';
import SwipeButtons from '@/components/SwipeButtons';
import AuthGuard from '@/components/AuthGuard';
import { fetchPets, recordSwipe } from '@/lib/pet';
import { getMe } from '@/lib/auth';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Heart } from 'lucide-react';

function HomeContent() {
  const { data, mutate } = useSWR('/pets', () => fetchPets().then(r => r.data), {
    refreshInterval: 0,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  const [user, setUser] = useState<{ name: string } | null>(null);
  const cardRefs = useRef<any[]>([]);
  const isMountedRef = useRef(true);
  const pets: any[] = data || [];

  useEffect(() => {
    isMountedRef.current = true;

    const fetchUser = async () => {
      try {
        const response = await getMe();
        if (isMountedRef.current) {
          setUser(response.data);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setUser(null);
        }
      }
    };

    fetchUser();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const swiped = useCallback(async (petId: string, direction: 'like' | 'pass') => {
    if (!isMountedRef.current) return;

    try {
      await recordSwipe(petId, direction);
      if (isMountedRef.current) {
        mutate();
      }
    } catch (error) {
      console.error('Error recording swipe:', error);
      // Still mutate to update the UI even if the API call failed
      if (isMountedRef.current) {
        mutate();
      }
    }
  }, [mutate]);

  // External swipe button handlers
  const handleExternalSwipe = useCallback((direction: 'left' | 'right') => {
    if (pets.length > 0 && cardRefs.current[0]) {
      // Trigger swipe on the top card
      cardRefs.current[0].swipe(direction);
    }
  }, [pets.length]);

  const setCardRef = useCallback((index: number, ref: any) => {
    if (cardRefs.current) {
      cardRefs.current[index] = ref;
    }
  }, []);

  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-4xl font-black text-slate-800 mb-2 font-heading tracking-tight">
          Hi {user?.name || 'there'}! <span className="animate-pulse inline-block">👋</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Find your perfect companion today
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex-1 flex flex-col justify-center items-center relative px-4 min-h-[650px]">
        <AnimatePresence mode="wait">
          {pets.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col items-center"
            >
              <div className="relative flex justify-center items-center w-full mb-10">
                <div className="relative w-80 h-[600px]">
                  {pets.slice(0, 3).map((pet, index) => (
                    <div
                      key={pet._id}
                      className="absolute inset-0"
                      style={{
                        zIndex: pets.length - index,
                        transform: `scale(${1 - index * 0.05}) translateY(${index * 15}px)`,
                        opacity: 1 - index * 0.2,
                        transition: 'all 0.3s ease-out'
                      }}
                    >
                      <PetCard
                        pet={pet}
                        onSwipe={swiped}
                        ref={(ref: any) => setCardRef(index, ref)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* External Swipe Buttons */}
              <SwipeButtons
                onPass={() => handleExternalSwipe('left')}
                onLike={() => handleExternalSwipe('right')}
                className="mb-4 z-10"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center w-full max-w-md px-4"
            >
              <div className="glass-card p-12 mx-auto text-center">
                <div className="text-8xl mb-6 animate-bounce">🐾</div>
                <h3 className="text-3xl font-black text-slate-800 mb-4 font-heading">No More Pets!</h3>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium">
                  You've seen all available pets for now. Check back later for new furry friends!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => mutate()}
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Refresh List
                  </button>
                  <a href="/matches" className="btn-secondary flex items-center justify-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    View Matches
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <AuthGuard>
      <HomeContent />
    </AuthGuard>
  );
}
