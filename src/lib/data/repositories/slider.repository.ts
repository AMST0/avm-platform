// ==========================================
// AVM Platform - Slider Repository
// ==========================================

import type { Slider } from '@/lib/types';
import { mockSliders } from '../mock/sliders';

/**
 * Get all active sliders ordered by position
 */
export async function getSliders(): Promise<Slider[]> {
    return mockSliders
        .filter((slider) => slider.isActive)
        .sort((a, b) => a.order - b.order);
}

/**
 * Get all sliders (including inactive) for admin
 */
export async function getAllSliders(): Promise<Slider[]> {
    return mockSliders.sort((a, b) => a.order - b.order);
}

/**
 * Get slider by ID
 */
export async function getSliderById(id: string): Promise<Slider | null> {
    return mockSliders.find((s) => s.id === id) || null;
}

// Admin functions
export async function createSlider(data: Omit<Slider, 'id' | 'createdAt' | 'updatedAt'>): Promise<Slider> {
    const newSlider: Slider = {
        ...data,
        id: `slider-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    mockSliders.push(newSlider);
    return newSlider;
}

export async function updateSlider(
    id: string,
    data: Partial<Omit<Slider, 'id' | 'createdAt'>>
): Promise<Slider | null> {
    const index = mockSliders.findIndex((s) => s.id === id);
    if (index === -1) return null;

    mockSliders[index] = { ...mockSliders[index], ...data, updatedAt: new Date() };
    return mockSliders[index];
}

export async function deleteSlider(id: string): Promise<boolean> {
    const index = mockSliders.findIndex((s) => s.id === id);
    if (index === -1) return false;
    mockSliders.splice(index, 1);
    return true;
}

/**
 * Reorder sliders (for drag & drop)
 * @param orderedIds - Array of slider IDs in new order
 */
export async function reorderSliders(orderedIds: string[]): Promise<void> {
    orderedIds.forEach((id, index) => {
        const slider = mockSliders.find((s) => s.id === id);
        if (slider) {
            slider.order = index;
            slider.updatedAt = new Date();
        }
    });
}
