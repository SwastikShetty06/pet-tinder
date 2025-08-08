'use client';
import { useState, useEffect, useRef } from 'react';
import { getMe } from '@/lib/auth';

interface User {
  name: string;
  email?: string;
  id?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(true);

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
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    fetchUser();
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const refreshUser = () => {
    fetchUser();
  };

  return { user, isLoading, refreshUser };
}

/**
 * A custom hook that provides safe state management to prevent state updates
 * on unmounted components, which can cause React errors.
 */
export function useSafeState<T>(initialState: T): [T, (newState: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialState);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const setSafeState = useCallback((newState: T | ((prev: T) => T)) => {
    if (isMountedRef.current) {
      setState(newState);
    }
  }, []);

  return [state, setSafeState];
}

/**
 * A custom hook for safely performing async operations
 */
export function useSafeAsync() {
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const safeAsync = useCallback(async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
    try {
      const result = await asyncFn();
      return isMountedRef.current ? result : null;
    } catch (error) {
      if (isMountedRef.current) {
        throw error;
      }
      return null;
    }
  }, []);

  return { safeAsync, isMounted: isMountedRef.current };
}
