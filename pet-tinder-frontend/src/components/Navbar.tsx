'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { logout } from '@/lib/auth';
import { useAuth } from '@/hooks/useSafeState';
import { PawPrint, LogOut, User, LogIn } from 'lucide-react';

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
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform duration-300">
              <PawPrint className="text-white w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-heading">
                PawMatch
              </span>
            </div>
          </Link>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="animate-pulse flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                <div className="w-20 h-4 bg-slate-200 rounded hidden sm:block"></div>
              </div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="w-9 h-9 bg-gradient-to-br from-secondary to-teal-400 rounded-full flex items-center justify-center shadow-md text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-bold text-slate-700">
                    Hi, {user.name}!
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-primary hover:bg-pink-50 rounded-full transition-all duration-200"
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-primary to-primary-hover rounded-full shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:-translate-y-0.5 transition-all duration-300"
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
