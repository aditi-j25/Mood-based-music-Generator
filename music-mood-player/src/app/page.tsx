//landing page for the app with a brief intro and a call-to-action button to get started

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">
            Music Mood Player
          </h1>
          <p className="text-2xl mb-12 text-purple-100">
            Discover music that matches your mood, powered by AI
          </p>
          <div className="flex gap-4 justify-center mb-16">
            <Link
            href="/signup"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition shadow-lg">
            Get Started
            </Link>
            <Link href="/login"
            className="bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-800 transition shadow-lg" >
            Sign In
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
          <div className="text-4xl mb-4">🎵</div>
          <h3 className="text-xl font-bold mb-2">Mood-Based Selection</h3>
          <p className="text-purple-100">
            Tell us how you feel, we'll find the perfect soundtrack
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
          <p className="text-purple-100">
            Smart recommendations that learn your preferences
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-2">Track Your Moods</h3>
          <p className="text-purple-100">
            See your listening history and mood patterns
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}
 
