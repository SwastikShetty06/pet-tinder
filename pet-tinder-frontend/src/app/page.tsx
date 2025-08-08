'use client';
import useSWR from 'swr';
import PetCard from '@/components/PetCard';
import SwipeButtons from '@/components/SwipeButtons';
import AuthGuard from '@/components/AuthGuard';
import { fetchPets, recordSwipe } from '@/lib/pet';
import { getMe } from '@/lib/auth';
import { useEffect, useState, useRef, useCallback } from 'react';

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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-red-50">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Hi {user?.name || 'there'}! 👋
        </h1>
        <p className="text-gray-600">
          Find your perfect companion
        </p>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col justify-center items-center min-h-[700px] relative px-4">
        {pets.length ? (
          <>
            <div className="relative flex justify-center items-center w-full mb-8">
              <div className="relative w-80 h-[600px]">
                {pets.slice(0, 3).map((pet, index) => (
                  <div 
                    key={pet._id} 
                    className="absolute inset-0"
                    style={{
                      zIndex: pets.length - index,
                      transform: `rotate(${(index % 3 - 1) * 1}deg) translateY(${index * 2}px)`,
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
              className="mb-4"
            />
          </>
        ) : (
          <div className="text-center animate-fadeIn">
            <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-lg">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No More Pets!</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                You've seen all available pets. Check back later for new arrivals!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => mutate()}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  🔄 Refresh
                </button>
                <a href="/matches" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold transition-colors">
                  💕 View Matches
                </a>
              </div>
            </div>
          </div>
        )}
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
