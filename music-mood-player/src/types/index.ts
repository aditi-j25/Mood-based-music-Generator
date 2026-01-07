export type MoodType = 'happy' | 'sad' | 'energetic' | 'calm' | 'focused' | 'romantic'

export interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{ name: string; id: string }>
  album: {
    name: string
    images: Array<{ url: string; height: number; width: number }>
  }
  duration_ms: number
  preview_url: string | null
  external_urls: {
    spotify: string
  }
}

export interface UserPreferences {
  favorite_genres: string[]
  favorite_artists: string[]
}

export interface MoodRecommendation {
  mood: MoodType
  tracks: SpotifyTrack[]
  reason?: string
}

export interface PlaybackState {
  currentTrack: SpotifyTrack | null
  isPlaying: boolean
  progress: number
  volume: number
}