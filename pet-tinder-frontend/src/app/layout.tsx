import Navbar from '@/components/Navbar';
import BottomNavigation from '@/components/BottomNavigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import './globals.css';

export const metadata = { 
  title: 'PawMatch - Find Your Perfect Companion',
  description: 'Connect with adorable pets looking for their forever home. Swipe, match, and adopt with love.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50">
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pb-20">
              {children}
            </main>
            <BottomNavigation />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
