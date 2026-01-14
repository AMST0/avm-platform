// ==========================================
// AVM Platform - Event Repository
// ==========================================

import type { Event } from '@/lib/types';
import { mockEvents } from '../mock/events';

/**
 * Get all events
 */
export async function getEvents(): Promise<Event[]> {
    return mockEvents.filter((event) => event.isActive);
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return mockEvents.filter((event) => event.isActive && event.endDate >= now);
}

/**
 * Get past events
 */
export async function getPastEvents(): Promise<Event[]> {
    const now = new Date();
    return mockEvents.filter((event) => event.isActive && event.endDate < now);
}

/**
 * Get event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
    return mockEvents.find((e) => e.slug === slug) || null;
}

/**
 * Get event by ID
 */
export async function getEventById(id: string): Promise<Event | null> {
    return mockEvents.find((e) => e.id === id) || null;
}

// Admin functions
export async function createEvent(data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    const newEvent: Event = {
        ...data,
        id: `event-${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    mockEvents.push(newEvent);
    return newEvent;
}

export async function updateEvent(
    id: string,
    data: Partial<Omit<Event, 'id' | 'createdAt'>>
): Promise<Event | null> {
    const index = mockEvents.findIndex((e) => e.id === id);
    if (index === -1) return null;

    mockEvents[index] = { ...mockEvents[index], ...data, updatedAt: new Date() };
    return mockEvents[index];
}

export async function deleteEvent(id: string): Promise<boolean> {
    const index = mockEvents.findIndex((e) => e.id === id);
    if (index === -1) return false;
    mockEvents.splice(index, 1);
    return true;
}
