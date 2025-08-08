'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { logout } from '@/lib/auth';
import { useAuth } from '@/hooks/useSafeState';

export default function Navbar() {
  const { user, isLoading, refreshUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isMountedRef = useRef(true);
  
  // Check if we're on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  // Re-fetch user data when pathname changes (after login/logout)
  useEffect(() => {
    if (!isAuthPage) {
      refreshUser();
    }
  }, [pathname, refreshUser]);

  const handleLogout = async () => { 
    try {
      await logout(); 
      if (isMountedRef.current) {
        refreshUser();
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isAuthPage) return null;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-lg font-bold">🐾</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                PawMatch
              </span>
            </div>
          </Link>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="w-20 h-8 bg-gray-200 rounded"></div>
              </div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    Hi, {user.name}!
                  </span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  Sign in
                </Link>
                <Link 
                  href="/signup" 
                  className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
