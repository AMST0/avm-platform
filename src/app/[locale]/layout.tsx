import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing, isRtlLocale, type Locale } from '@/i18n/routing';
import { Toaster } from '@/components/ui/sonner';
import { AMSTConsoleSignature } from '@/components/shared/amst-console-signature';
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
    title: {
        default: "AVM Platform | Shopping Mall",
        template: "%s | AVM Platform",
    },
    description: "Digital Architecture by AMST - Premium Shopping Mall Experience",
    keywords: ["shopping mall", "AVM", "mağaza", "alışveriş merkezi"],
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Enable static rendering
    setRequestLocale(locale);

    // Get messages for the current locale
    const messages = await getMessages();

    // Determine text direction
    const dir = isRtlLocale(locale as Locale) ? 'rtl' : 'ltr';

    return (
        <html lang={locale} dir={dir} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <AMSTConsoleSignature />
                    {children}
                    <Toaster position={dir === 'rtl' ? 'bottom-left' : 'bottom-right'} />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
