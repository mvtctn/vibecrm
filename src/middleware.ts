import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // Bảo vệ các routes nội bộ
    // Các trang bắt đầu bằng /dashboard, /contacts, /pipeline, /settings, /follow-ups, /inbox và trang chủ /
    const protectedRoutes = ['/', '/dashboard', '/contacts', '/pipeline', '/settings', '/follow-ups', '/inbox', '/projects', '/tasks', '/social'];
    const isProtectedRoute = protectedRoutes.some(path =>
        request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`)
    );

    if (isProtectedRoute && !user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Nếu đã đăng nhập, không cho vào trang /login nữa
    if (request.nextUrl.pathname === '/login' && user) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - api/webhooks (webhook endpoints should be public or have their own auth)
         */
        '/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)',
    ],
}
