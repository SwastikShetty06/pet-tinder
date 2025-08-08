'use client';

import AuthGuard from '@/components/AuthGuard';

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-red-50">
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Profile Page
          </h1>
          <p className="text-gray-600">
            Coming soon...
          </p>
        </div>
      </div>
    </AuthGuard>
  );
}
