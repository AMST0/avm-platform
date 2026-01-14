// ==========================================
// AVM Platform - Popup Repository
// ==========================================

import type { Popup } from '@/lib/types';
import { mockPopups } from '../mock/popups';

/**
 * Get active popup
 */
export async function getActivePopup(): Promise<Popup | null> {
    return mockPopups.find((popup) => popup.isActive) || null;
}

/**
 * Get all popups for admin
 */
export async function getAllPopups(): Promise<Popup[]> {
    return mockPopups;
}

// Alias for compatibility
export const getPopups = getAllPopups;

/**
 * Get popup by ID
 */
export async function getPopupById(id: string): Promise<Popup | null> {
    return mockPopups.find((p) => p.id === id) || null;
}

// Admin functions
export async function createPopup(data: Omit<Popup, 'id' | 'createdAt' | 'updatedAt'>): Promise<Popup> {
    const newPopup: Popup = {
        ...data,
        id: `popup-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    mockPopups.push(newPopup);
    return newPopup;
}

export async function updatePopup(
    id: string,
    data: Partial<Omit<Popup, 'id' | 'createdAt'>>
): Promise<Popup | null> {
    const index = mockPopups.findIndex((p) => p.id === id);
    if (index === -1) return null;

    mockPopups[index] = { ...mockPopups[index], ...data, updatedAt: new Date() };
    return mockPopups[index];
}

export async function deletePopup(id: string): Promise<boolean> {
    const index = mockPopups.findIndex((p) => p.id === id);
    if (index === -1) return false;
    mockPopups.splice(index, 1);
    return true;
}
