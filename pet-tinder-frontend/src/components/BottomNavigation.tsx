'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Star, PlusCircle } from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();

  // Don't show bottom nav on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) return null;

  const navItems = [
    {
      href: '/',
      icon: Flame,
      label: 'Discover',
      key: 'discover'
    },
    {
      href: '/matches',
      icon: Star,
      label: 'Matches',
      key: 'matches'
    },
    {
      href: '/pets',
      icon: PlusCircle,
      label: 'Add Pet',
      key: 'addpet'
    },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-md mx-auto glass rounded-full shadow-2xl pointer-events-auto">
        <div className="flex justify-around items-center py-3 px-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
            const IconComponent = item.icon;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-br from-primary to-primary-hover text-white shadow-lg shadow-pink-200 scale-110 -translate-y-2'
                    : 'text-slate-400 hover:text-primary hover:bg-pink-50'
                  }`}
              >
                <IconComponent
                  className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
