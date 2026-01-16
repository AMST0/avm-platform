import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.AUTH_SECRET || 'fallback-secret');
const SESSION_DURATION = 12 * 60 * 60 * 1000; // 12 hours

// POST - Login
export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            return NextResponse.json(
                { success: false, error: 'Admin credentials not configured' },
                { status: 500 }
            );
        }

        if (email !== adminEmail || password !== adminPassword) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create JWT token
        const token = await new SignJWT({ email, role: 'admin' })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('12h')
            .sign(SECRET_KEY);

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('admin-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: SESSION_DURATION / 1000,
            path: '/',
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Login failed' },
            { status: 500 }
        );
    }
}

// GET - Check session
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin-token')?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false });
        }

        try {
            const verified = await jwtVerify(token, SECRET_KEY);
            return NextResponse.json({
                authenticated: true,
                email: verified.payload.email
            });
        } catch {
            return NextResponse.json({ authenticated: false });
        }
    } catch (error) {
        return NextResponse.json({ authenticated: false });
    }
}

// DELETE - Logout
export async function DELETE() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete('admin-token');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Logout failed' },
            { status: 500 }
        );
    }
}
