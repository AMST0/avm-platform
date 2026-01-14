// ==========================================
// AVM Platform - Zod Validation Schemas
// ==========================================

import { z } from 'zod';
import type { Locale } from '@/lib/types';

// Localized string schema - all 4 languages required
const localizedStringSchema = z.object({
    tr: z.string().min(1, 'Türkçe alan zorunludur'),
    en: z.string().min(1, 'English field is required'),
    ru: z.string().min(1, 'Русское поле обязательно'),
    ar: z.string().min(1, 'الحقل العربي مطلوب'),
});

// SEO Schema - MANDATORY fields (no auto-generate!)
const seoSchema = z.object({
    metaTitle: localizedStringSchema,
    metaDescription: localizedStringSchema,
});

// ==========================================
// Shop Schema (Strict SEO Validation)
// ==========================================
export const shopSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, 'Mağaza adı en az 2 karakter olmalıdır'),
    slug: z.string().min(2, 'Slug en az 2 karakter olmalıdır').regex(/^[a-z0-9-]+$/, 'Slug sadece küçük harf, rakam ve tire içerebilir'),
    category: z.enum(['fashion', 'electronics', 'food', 'entertainment', 'health', 'home', 'jewelry', 'sports', 'cosmetics', 'services']),
    floor: z.number().min(-1).max(4),
    logo: z.string().min(1, 'Logo zorunludur'),
    phone: z.string().optional(),
    website: z.string().url().optional().or(z.literal('')),

    featured: z.boolean().default(false),
    isActive: z.boolean().default(true),
});

// Input type (form'dan gelen data)
export type ShopInput = z.input<typeof shopSchema>;
// Output type (parse sonrası garantili data)  
export type ShopFormData = z.output<typeof shopSchema>;

// ==========================================
// Event Schema
// ==========================================
export const eventSchema = z.object({
    id: z.string().optional(),
    title: localizedStringSchema,
    slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
    description: localizedStringSchema,
    image: z.string().min(1, 'Görsel zorunludur'),
    startDate: z.date(),
    endDate: z.date(),
    location: z.string().min(1, 'Konum zorunludur'),
    seo: seoSchema,
    isActive: z.boolean().default(true),
}).refine((data) => data.endDate >= data.startDate, {
    message: 'Bitiş tarihi başlangıç tarihinden önce olamaz',
    path: ['endDate'],
});

export type EventFormData = z.infer<typeof eventSchema>;

// ==========================================
// Slider Schema
// ==========================================
export const sliderSchema = z.object({
    id: z.string().optional(),
    title: localizedStringSchema,
    subtitle: localizedStringSchema.optional(),
    image: z.string().min(1, 'Görsel zorunludur (16:9 oran)'),
    mobileImage: z.string().optional(),
    link: z.string().url().optional().or(z.literal('')),
    order: z.number().min(0).optional().default(0),
    isActive: z.boolean().optional().default(true),
});

export type SliderInput = z.input<typeof sliderSchema>;
export type SliderFormData = z.output<typeof sliderSchema>;

// ==========================================
// Popup Schema
// ==========================================
export const popupSchema = z.object({
    id: z.string().optional(),
    title: localizedStringSchema,
    image: z.string().min(1, 'Görsel zorunludur'),
    link: z.string().url().optional().or(z.literal('')),
    frequency: z.enum(['once', 'always']),
    isActive: z.boolean().optional().default(true),
});

export type PopupInput = z.input<typeof popupSchema>;
export type PopupFormData = z.output<typeof popupSchema>;
