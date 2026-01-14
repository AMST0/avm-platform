// ==========================================
// AVM Platform - i18n Routing Configuration
// ==========================================

import { defineRouting } from 'next-intl/routing';

export const locales = ['tr', 'en', 'ru', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
    locales,
    defaultLocale: 'tr',
    localePrefix: 'always',
});

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

export function isRtlLocale(locale: Locale): boolean {
    return rtlLocales.includes(locale);
}
