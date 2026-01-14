"use client";

import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    LayoutDashboard,
    Store,
    Calendar,
    Image,
    Megaphone,
    Mail,
    Settings,
    LogOut,
    ExternalLink,
} from 'lucide-react';

const adminNavigation = [
    { href: '/admin/overview', label: 'dashboard', icon: LayoutDashboard },
    { href: '/admin/shops', label: 'shops', icon: Store },
    { href: '/admin/events', label: 'events', icon: Calendar },
    { href: '/admin/sliders', label: 'sliders', icon: Image },
    { href: '/admin/popups', label: 'popups', icon: Megaphone },
    { href: '/admin/inquiries', label: 'inquiries', icon: Mail },
];

const adminSecondary = [
    { href: '/admin/settings', label: 'settings', icon: Settings },
];

export function AdminSidebar() {
    const t = useTranslations('admin');
    const locale = useLocale();
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === '/admin' || href === '/admin/overview') {
            return pathname === '/admin' || pathname === `/${locale}/admin` || pathname.includes('/admin/overview');
        }
        return pathname.includes(href);
    };

    return (
        <aside className="fixed top-0 start-0 h-screen z-40 w-[68px] bg-slate-900 border-e border-slate-800">
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="h-16 flex items-center justify-center border-b border-slate-800">
                    <Link href="/" className="flex items-center justify-center">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center shadow-lg shadow-gold/30">
                            <span className="text-white font-bold">A</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1 py-4">
                    <nav className="space-y-1 px-2">
                        {adminNavigation.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center justify-center w-11 h-11 mx-auto rounded-xl transition-all duration-200 group relative',
                                        active
                                            ? 'bg-gradient-to-br from-gold/20 to-amber-500/10 text-gold'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    )}
                                    title={t(item.label)}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {active && (
                                        <div className="absolute start-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-e-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="my-4 mx-3 h-px bg-slate-800" />

                    <nav className="space-y-1 px-2">
                        {adminSecondary.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center justify-center w-11 h-11 mx-auto rounded-xl transition-all duration-200 group relative',
                                        active
                                            ? 'bg-gradient-to-br from-gold/20 to-amber-500/10 text-gold'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    )}
                                    title={t(item.label)}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {active && (
                                        <div className="absolute start-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gold rounded-e-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </ScrollArea>

                {/* Footer */}
                <div className="p-2 border-t border-slate-800">
                    <Button
                        variant="ghost"
                        className="w-11 h-11 mx-auto flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl p-0"
                        title={t('logout')}
                    >
                        <LogOut className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </aside>
    );
}
