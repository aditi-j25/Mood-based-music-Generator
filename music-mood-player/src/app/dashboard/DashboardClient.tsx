'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { getUserPreferences, getRecentMoods, getListeningStats } from '@/lib/database'
import { MoodType } from '@/types'

interface DashboardClientProps {
  user: User
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [preferences, moods, listeningStats] = await Promise.all([
        getUserPreferences(user.id),
        getRecentMoods(user.id, 10),
        getListeningStats(user.id),
      ])

      setStats({
        preferences,
        recentMoods: moods,
        listening: listeningStats,
      })
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const moods: MoodType[] = ['happy', 'sad', 'energetic', 'calm', 'focused', 'romantic']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Music Mood Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Tracks</h3>
            <p className="text-3xl font-bold text-purple-600">
              {stats?.listening?.totalTracks || 0}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Listening Time</h3>
            <p className="text-3xl font-bold text-blue-600">
              {stats?.listening?.totalDurationMinutes || 0} min
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold text-green-600">
              {stats?.listening?.completionRate?.toFixed(0) || 0}%
            </p>
          </div>
        </div>

        {/* Mood Selector */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">How are you feeling?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {moods.map((mood) => (
              <button
                key={mood}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition capitalize text-center font-medium"
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Moods */}
        {stats?.recentMoods && stats.recentMoods.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Moods</h2>
            <div className="space-y-2">
              {stats.recentMoods.slice(0, 5).map((mood: any) => (
                <div
                  key={mood.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <span className="capitalize font-medium">{mood.mood}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(mood.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}