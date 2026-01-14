"use server";

import { revalidatePath } from 'next/cache';
import * as eventRepository from '../data/repositories/event.repository';
import { Event, EventInput } from '../types';

export async function getEventsAction(): Promise<Event[]> {
    return await eventRepository.getEvents();
}

export async function getEventBySlugAction(slug: string): Promise<Event | null> {
    return await eventRepository.getEventBySlug(slug);
}

export async function createEventAction(data: EventInput): Promise<Event> {
    const event = await eventRepository.createEvent(data);
    revalidatePath('/[locale]/events', 'page');
    return event;
}

export async function updateEventAction(id: string, data: Partial<EventInput>): Promise<Event> {
    const event = await eventRepository.updateEvent(id, data);
    revalidatePath('/[locale]/events', 'page');
    revalidatePath(`/[locale]/events/${event.slug}`, 'page');
    return event;
}

export async function deleteEventAction(id: string): Promise<void> {
    await eventRepository.deleteEvent(id);
    revalidatePath('/[locale]/events', 'page');
}

export async function getUpcomingEventsAction(limit?: number): Promise<Event[]> {
    return await eventRepository.getUpcomingEvents(limit);
}

export async function getPastEventsAction(limit?: number): Promise<Event[]> {
    return await eventRepository.getPastEvents(limit);
}
