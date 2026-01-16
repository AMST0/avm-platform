import { NextRequest, NextResponse } from 'next/server';
import { getPopups, createPopup, deletePopup, updatePopup } from '@/lib/data/repositories/popup.repository';
import { PopupInput } from '@/lib/types';

// GET all popups
export async function GET() {
    try {
        const popups = await getPopups();
        return NextResponse.json({ success: true, data: popups });
    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error('Failed to fetch popups:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch popups' },
            { status: 500 }
        );
    }
}

// POST create new popup
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const popup = await createPopup(body as PopupInput);
        return NextResponse.json({ success: true, data: popup });
    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error('Failed to create popup:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create popup' },
            { status: 500 }
        );
    }
}

// DELETE popup
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Popup ID required' },
                { status: 400 }
            );
        }

        await deletePopup(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error('Failed to delete popup:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete popup' },
            { status: 500 }
        );
    }
}

// PATCH update popup
export async function PATCH(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Popup ID required' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const popup = await updatePopup(id, body);
        return NextResponse.json({ success: true, data: popup });
    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error('Failed to update popup:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update popup' },
            { status: 500 }
        );
    }
}
