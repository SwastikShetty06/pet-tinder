import Navbar from '@/components/Navbar';
import BottomNavigation from '@/components/BottomNavigation';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Nunito, Quicksand } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

export const metadata = {
  title: 'PawMatch - Find Your Perfect Companion',
  description: 'Connect with adorable pets looking for their forever home. Swipe, match, and adopt with love.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${quicksand.variable}`}>
      <body className="min-h-screen bg-slate-50 font-sans">
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pb-24 pt-20">
              {children}
            </main>
            <BottomNavigation />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
