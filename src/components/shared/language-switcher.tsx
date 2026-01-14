"use client";

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe, Check } from 'lucide-react';

const localeNames: Record<Locale, string> = {
    tr: 'Türkçe',
    en: 'English',
    ru: 'Русский',
    ar: 'العربية',
};

const localeFlags: Record<Locale, string> = {
    tr: '🇹🇷',
    en: '🇬🇧',
    ru: '🇷🇺',
    ar: '🇸🇦',
};

export function LanguageSwitcher({ variant = 'default' }: { variant?: 'default' | 'minimal' }) {
    const t = useTranslations('common');
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (newLocale: Locale) => {
        router.replace(pathname, { locale: newLocale });
    };

    if (variant === 'minimal') {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Globe className="h-4 w-4" />
                        <span className="sr-only">{t('language')}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[140px]">
                    {routing.locales.map((loc) => (
                        <DropdownMenuItem
                            key={loc}
                            onClick={() => handleLocaleChange(loc)}
                            className="flex items-center justify-between cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                <span>{localeFlags[loc]}</span>
                                <span>{localeNames[loc]}</span>
                            </span>
                            {locale === loc && <Check className="h-4 w-4 text-gold" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <span>{localeFlags[locale]}</span>
                    <span className="hidden sm:inline">{localeNames[locale]}</span>
                    <Globe className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
                {routing.locales.map((loc) => (
                    <DropdownMenuItem
                        key={loc}
                        onClick={() => handleLocaleChange(loc)}
                        className="flex items-center justify-between cursor-pointer"
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-lg">{localeFlags[loc]}</span>
                            <span>{localeNames[loc]}</span>
                        </span>
                        {locale === loc && <Check className="h-4 w-4 text-gold" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
