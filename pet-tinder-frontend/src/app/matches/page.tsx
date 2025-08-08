'use client';
import useSWR from 'swr';
import AuthGuard from '@/components/AuthGuard';
import { fetchMatches } from '@/lib/pet';

const getSpeciesEmoji = (species: string) => {
  const s = species?.toLowerCase() || '';
  if (s.includes('dog')) return '🐕';
  if (s.includes('cat')) return '🐱';
  if (s.includes('bird')) return '🦜';
  if (s.includes('rabbit')) return '🐰';
  if (s.includes('hamster')) return '🐹';
  if (s.includes('fish')) return '🐠';
  return '🐾';
};

function MatchesContent() {
  const { data, error, isLoading } = useSWR('/matches', () => fetchMatches().then(r => r.data));
  
  // Filter out matches with null/invalid pet data
  const matches = (data || []).filter((match: any) => match && match.petId);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your matches...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load your matches right now.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="text-center mb-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Your Matches
        </h1>
        <p className="text-gray-600">
          {matches.length} pets waiting for you!
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto px-4">
        {matches.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((match: any, idx: number) => {
              const pet = match.petId;
              
              // Skip if pet data is null or undefined
              if (!pet) {
                return null;
              }
              
              return (
                <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Pet Image */}
                  <div className="h-48 overflow-hidden relative">
                    {pet.images?.[0] ? (
                      <img 
                        src={pet.images[0]} 
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-300 to-pink-500">
                        <span className="text-6xl">
                          {getSpeciesEmoji(pet.species)}
                        </span>
                      </div>
                    )}
                    
                    {/* Featured Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                        Featured
                      </span>
                    </div>
                    
                    {/* Heart Icon */}
                    <div className="absolute top-2 right-2">
                      <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                        <span className="text-red-500 text-sm">❤️</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pet Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">
                        {pet.name}
                      </h3>
                      <span className="text-sm text-gray-600">
                        {pet.age} years
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2 text-sm text-gray-600">
                      <span>{pet.species} • {pet.gender || 'Unknown'}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="mr-1">📍</span>
                      <span>{pet.location || 'Portland, OR'}</span>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                        Calm
                      </span>
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                        Affectionate
                      </span>
                      <span className="text-gray-400 text-xs">+2</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-red-500">
                        ${pet.adoptionFee || '150'}
                      </span>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center">
            <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-lg">
              <div className="text-6xl mb-4">💔</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Matches Yet</h3>
              <p className="text-gray-600 mb-6">
                Start swiping to find pets you'd love to adopt!
              </p>
              <a href="/" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                🐾 Start Swiping
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MatchesPage() {
  return (
    <AuthGuard>
      <MatchesContent />
    </AuthGuard>
  );
}
