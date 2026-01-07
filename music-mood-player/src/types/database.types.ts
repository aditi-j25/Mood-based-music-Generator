export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_preferences: {
        Row: {
          id: string
          favorite_genres: string[]
          favorite_artists: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          favorite_genres?: string[]
          favorite_artists?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          favorite_genres?: string[]
          favorite_artists?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      listening_history: {
        Row: {
          id: string
          user_id: string
          track_id: string
          track_name: string
          artist_name: string
          album_name: string | null
          mood: string
          completed: boolean
          duration_ms: number | null
          played_at: string
        }
        Insert: {
          id?: string
          user_id: string
          track_id: string
          track_name: string
          artist_name: string
          album_name?: string | null
          mood: string
          completed?: boolean
          duration_ms?: number | null
          played_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          track_id?: string
          track_name?: string
          artist_name?: string
          album_name?: string | null
          mood?: string
          completed?: boolean
          duration_ms?: number | null
          played_at?: string
        }
      }
      mood_logs: {
        Row: {
          id: string
          user_id: string
          mood: string
          energy_level: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mood: string
          energy_level?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mood?: string
          energy_level?: number | null
          created_at?: string
        }
      }
      saved_tracks: {
        Row: {
          id: string
          user_id: string
          track_id: string
          track_name: string
          artist_name: string
          saved_at: string
        }
        Insert: {
          id?: string
          user_id: string
          track_id: string
          track_name: string
          artist_name: string
          saved_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          track_id?: string
          track_name?: string
          artist_name?: string
          saved_at?: string
        }
      }
    }
  }
}