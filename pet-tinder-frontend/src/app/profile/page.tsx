'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { getMe } from '@/lib/auth';

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-red-50">
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Profile
          </h1>
          {isLoading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-pink-500 border-t-transparent mx-auto"></div>
          ) : user ? (
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
              <div className="text-6xl mb-4">👤</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{user.name}</h2>
              {user.email && (
                <p className="text-gray-600 mb-6">{user.email}</p>
              )}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Member since</span>
                  <span className="text-gray-500">2024</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Pets viewed</span>
                  <span className="text-gray-500">0</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Matches</span>
                  <span className="text-gray-500">0</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Unable to load profile</p>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
