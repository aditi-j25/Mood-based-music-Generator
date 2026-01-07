import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function proxy(request: Request) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.headers.get(`cookie-${name}`)
        },
        set(name, value, options) {
          response.headers.append(
            'Set-Cookie',
            `${name}=${value}; Path=/; HttpOnly; SameSite=Lax`
          )
        },
        remove(name) {
          response.headers.append(
            'Set-Cookie',
            `${name}=; Path=/; HttpOnly; Max-Age=0`
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const url = new URL(request.url)

  // Protect dashboard
  if (url.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect logged-in users away from login/signup
  if ((url.pathname === '/login' || url.pathname === '/signup') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}