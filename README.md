# Mood-based-music-Generator

## System Overview
Tools: 
- **Typescript** for better and easier debugging and increasing code reliability
- **Tailwind CSS** for the quick styling
- **Next.js** for frontend and backend framework
- **Postgres** using Supabase for Database and Auth
- **Spotify API** for the Music library api( since its fee and has a large collection of music from  various languages)
- For the **AI/Filtering LLM**, i will try to make my own. If it is not finished, then I will either use the **OpenAI API**(preferred) or the Anthropic Claude API, they are both good, free and reliable LLMs to be worked with. 

## The file structure for now
```
music-mood-player/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Landing page (public)
│   │   ├── layout.tsx                # Root layout
│   │   ├── login/
│   │   │   └── page.tsx              # Login page (public)
│   │   ├── signup/
│   │   │   └── page.tsx              # Signup page (public)
│   │   └── dashboard/
│   │       ├── page.tsx              # Server component (protected)
│   │       └── DashboardClient.tsx   # Client component
│   │
│   ├── lib/                          # Utility libraries
│   │   ├── supabase.ts               # Client-side Supabase
│   │   ├── supabase-server.ts        # Server-side Supabase
│   │   └── database.ts               # Database helper functions
│   │
│   ├── types/                        # TypeScript definitions
│   │   ├── database.types.ts         # Supabase table types
│   │   └── index.ts                  # App-specific types
│   │
│   └── middleware.ts                 # Auth protection
│
├── .env.local                        # Environment variables (secret)
└── package.json
```

## Development Plan
1. Create dashboard page with mood selector --Almost finished
2. Integrate Spotify API for music search
3. Build music player component
4. Add recommendation algorithm
5. Track listening history in database
6. Add AI-powered recommendations

