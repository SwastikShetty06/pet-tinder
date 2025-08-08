'use client';
import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState, useCallback } from 'react';
import TinderCard from 'react-tinder-card';

interface SafeTinderCardProps {
  onSwipe: (direction: string) => void;
  preventSwipe?: string[];
  className?: string;
  children: React.ReactNode;
}

const SafeTinderCard = forwardRef<any, SafeTinderCardProps>(
  ({ onSwipe, preventSwipe = ['up', 'down'], className = '', children }, ref) => {
    const [cardRef, setCardRef] = useState<any>(null);
    const isMountedRef = useRef(true);
    const swipeHandledRef = useRef(false);

    useEffect(() => {
      isMountedRef.current = true;
      
      return () => {
        isMountedRef.current = false;
        swipeHandledRef.current = false;
      };
    }, []);

    // Expose swipe method to parent through ref
    useImperativeHandle(ref, () => ({
      swipe: (direction: 'left' | 'right') => {
        if (cardRef && isMountedRef.current && !swipeHandledRef.current) {
          try {
            cardRef.swipe(direction);
          } catch (error) {
            console.error('Error during programmatic swipe:', error);
          }
        }
      }
    }), [cardRef]);

    const handleSwipe = useCallback((direction: string) => {
      if (!isMountedRef.current || swipeHandledRef.current) {
        return;
      }
      
      swipeHandledRef.current = true;
      
      try {
        onSwipe(direction);
      } catch (error) {
        console.error('Error in swipe handler:', error);
      } finally {
        // Reset the flag after a short delay to allow for potential re-mounting
        setTimeout(() => {
          swipeHandledRef.current = false;
        }, 100);
      }
    }, [onSwipe]);

    const handleCardRestore = useCallback(() => {
      swipeHandledRef.current = false;
    }, []);

    return (
      <TinderCard
        ref={setCardRef}
        onSwipe={handleSwipe}
        onCardLeftScreen={handleCardRestore}
        preventSwipe={preventSwipe}
        className={className}
      >
        {children}
      </TinderCard>
    );
  }
);

SafeTinderCard.displayName = 'SafeTinderCard';

export default SafeTinderCard;
