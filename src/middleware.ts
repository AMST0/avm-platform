import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const intlMiddleware = createIntlMiddleware(routing);

const SECRET_KEY = new TextEncoder().encode(process.env.AUTH_SECRET || 'fallback-secret');

async function verifyToken(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, SECRET_KEY);
        return true;
    } catch {
        return false;
    }
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if it's an admin route (but not login page)
    const isAdminRoute = pathname.includes('/admin') && !pathname.includes('/admin/login');

    if (isAdminRoute) {
        const token = request.cookies.get('admin-token')?.value;

        if (!token) {
            // Get locale from pathname
            const locale = pathname.split('/')[1] || 'tr';
            return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
        }

        const isValid = await verifyToken(token);
        if (!isValid) {
            const locale = pathname.split('/')[1] || 'tr';
            return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
        }
    }

    // If already logged in and trying to access login page, redirect to overview
    if (pathname.includes('/admin/login')) {
        const token = request.cookies.get('admin-token')?.value;
        if (token) {
            const isValid = await verifyToken(token);
            if (isValid) {
                const locale = pathname.split('/')[1] || 'tr';
                return NextResponse.redirect(new URL(`/${locale}/admin/overview`, request.url));
            }
        }
    }

    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /images, /favicon.ico, etc. (static files)
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
