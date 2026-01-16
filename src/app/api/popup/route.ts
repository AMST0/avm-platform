import { NextResponse } from 'next/server';
import { getActivePopup } from '@/lib/data/repositories/popup.repository';

export async function GET() {
    try {
        const popup = await getActivePopup();
        return NextResponse.json({ success: true, data: popup });
    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error('Failed to fetch active popup:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch popup' },
            { status: 500 }
        );
    }
}
