'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signup } from '@/lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [pw, setPw] = useState(''), [error, setError] = useState('');

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await signup(name, email, pw); router.push('/'); }
    catch (e: any) { setError(e.response?.data?.message || 'Signup failed'); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white text-3xl font-bold">🐾</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            PawMatch
          </h1>
        </div>
        
        <form onSubmit={handle} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Join the Pack!</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <input 
                placeholder="Full Name" 
                value={name} 
                onChange={e=>setName(e.target.value)} 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Password" 
                value={pw} 
                onChange={e=>setPw(e.target.value)} 
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>
          
          <button type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Create Account
          </button>
          
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-600 hover:text-purple-500 font-semibold transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
