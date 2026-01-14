
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const sliders = await prisma.slider.findMany();
        return NextResponse.json({
            count: sliders.length,
            sliders,
            env: process.env.DATABASE_URL?.split('@')[1] // Log partial DB URL for verification
        });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
