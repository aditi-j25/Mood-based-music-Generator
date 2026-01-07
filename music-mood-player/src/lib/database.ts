import { supabase } from './supabase'
import { Database } from '@/types/database.types'
import { MoodType } from '@/types'

type UserPreferences = Database['public']['Tables']['user_preferences']['Row']
type ListeningHistory = Database['public']['Tables']['listening_history']['Insert']
type MoodLog = Database['public']['Tables']['mood_logs']['Insert']

// User Preferences
export async function getUserPreferences(userId: string): Promise<UserPreferences | null> {
  const { data, error } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user preferences:', error)
    return null
  }
  return data
}

export async function updateUserPreferences(
  userId: string,
  preferences: Partial<UserPreferences>
) {
  const { data, error } = await supabase
    .from('user_preferences')
    .update(preferences)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createUserPreferences(userId: string) {
  const { data, error } = await supabase
    .from('user_preferences')
    .insert({
      id: userId,
      favorite_genres: [],
      favorite_artists: [],
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// Listening History
export async function addToListeningHistory(history: ListeningHistory) {
  const { data, error } = await supabase
    .from('listening_history')
    .insert(history)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getRecentListeningHistory(userId: string, limit = 50) {
  const { data, error } = await supabase
    .from('listening_history')
    .select('*')
    .eq('user_id', userId)
    .order('played_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function getListeningHistoryByMood(userId: string, mood: MoodType) {
  const { data, error } = await supabase
    .from('listening_history')
    .select('*')
    .eq('user_id', userId)
    .eq('mood', mood)
    .order('played_at', { ascending: false })

  if (error) throw error
  return data
}

// Mood Logs
export async function logMood(moodLog: MoodLog) {
  const { data, error } = await supabase
    .from('mood_logs')
    .insert(moodLog)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getRecentMoods(userId: string, limit = 20) {
  const { data, error } = await supabase
    .from('mood_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

// Saved Tracks
export async function saveTrack(
  userId: string,
  trackId: string,
  trackName: string,
  artistName: string
) {
  const { data, error } = await supabase
    .from('saved_tracks')
    .insert({
      user_id: userId,
      track_id: trackId,
      track_name: trackName,
      artist_name: artistName,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getSavedTracks(userId: string) {
  const { data, error } = await supabase
    .from('saved_tracks')
    .select('*')
    .eq('user_id', userId)
    .order('saved_at', { ascending: false })

  if (error) throw error
  return data
}

export async function removeSavedTrack(userId: string, trackId: string) {
  const { error } = await supabase
    .from('saved_tracks')
    .delete()
    .eq('user_id', userId)
    .eq('track_id', trackId)

  if (error) throw error
}

// Analytics
export async function getMoodStats(userId: string) {
  const { data, error } = await supabase
    .from('mood_logs')
    .select('mood')
    .eq('user_id', userId)

  if (error) throw error

  // Count mood occurrences
  const moodCounts: Record<string, number> = {}
  data.forEach((log) => {
    moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1
  })

  return moodCounts
}

export async function getListeningStats(userId: string) {
  const { data, error } = await supabase
    .from('listening_history')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error

  const totalTracks = data.length
  const completedTracks = data.filter((h) => h.completed).length
  const totalDuration = data.reduce((sum, h) => sum + (h.duration_ms || 0), 0)

  return {
    totalTracks,
    completedTracks,
    completionRate: totalTracks > 0 ? (completedTracks / totalTracks) * 100 : 0,
    totalDurationMs: totalDuration,
    totalDurationMinutes: Math.round(totalDuration / 60000),
  }
}