'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// SVG Icons for better design matching the image
const FireIcon = ({ className, isActive }: { className?: string; isActive?: boolean }) => (
  <svg 
    className={className} 
    fill={isActive ? "#ff6b6b" : "currentColor"} 
    viewBox="0 0 24 24" 
    width="24" 
    height="24"
  >
    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.28 2.65-.2 3.73-.74 1.67-2.23 2.72-4.01 2.72z"/>
  </svg>
);

const StarIcon = ({ className, isActive }: { className?: string; isActive?: boolean }) => (
  <svg 
    className={className} 
    fill={isActive ? "#ff6b6b" : "none"} 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const HeartIcon = ({ className, isActive }: { className?: string; isActive?: boolean }) => (
  <svg 
    className={className} 
    fill={isActive ? "#ff6b6b" : "none"} 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const UserIcon = ({ className, isActive }: { className?: string; isActive?: boolean }) => (
  <svg 
    className={className} 
    fill={isActive ? "#ff6b6b" : "none"} 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const AddPetIcon = ({ className, isActive }: { className?: string; isActive?: boolean }) => (
  <svg 
    className={className} 
    fill={isActive ? "#ff6b6b" : "none"} 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24"
  >
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8" />
  </svg>
);

export default function BottomNavigation() {
  const pathname = usePathname();
  
  // Don't show bottom nav on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  
  if (isAuthPage) return null;

  const navItems = [
    { 
      href: '/', 
      icon: FireIcon, 
      label: 'Discover',
      key: 'discover'
    },
    { 
      href: '/matches', 
      icon: StarIcon, 
      label: 'Matches',
      key: 'matches'
    },
    { 
      href: '/pets', 
      icon: AddPetIcon, 
      label: 'Add Pet',
      key: 'addpet'
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl" style={{ zIndex: 9999 }}>
      <div className="flex justify-around items-center py-3 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
          const IconComponent = item.icon;
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 transition-all duration-200 min-w-0 ${
                isActive 
                  ? 'text-red-500' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="mb-1">
                <IconComponent 
                  className="w-6 h-6" 
                  isActive={isActive} 
                />
              </div>
              <span className={`text-xs font-medium ${
                isActive ? 'text-red-500' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
