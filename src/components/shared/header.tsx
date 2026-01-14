"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useSpotlightStore } from '@/lib/store';
import { LanguageSwitcher } from './language-switcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    Search,
    Menu,
    X,
    Store,
    Calendar,
    Phone,
    Home
} from 'lucide-react';

const navigation = [
    { href: '/', label: 'home', icon: Home },
    { href: '/shops', label: 'shops', icon: Store },
    { href: '/events', label: 'events', icon: Calendar },
    { href: '/leasing', label: 'leasing', icon: Search },
    { href: '/contact', label: 'contact', icon: Phone },
];

export function Header() {
    const t = useTranslations('common');
    const locale = useLocale();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const openSpotlight = useSpotlightStore((state) => state.open);

    // Handle scroll for glassmorphism effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle Cmd+K / Ctrl+K for spotlight search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                openSpotlight();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [openSpotlight]);

    return (
        <header
            className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 ${isScrolled
                ? 'glass-header shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy to-navy-dark flex items-center justify-center shadow-lg group-hover:shadow-navy/25 transition-shadow">
                            <span className="text-gold font-bold text-lg">A</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-bold text-lg text-foreground">AVM</span>
                            <span className="font-light text-muted-foreground ms-1">Platform</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors font-medium"
                            >
                                {t(item.label)}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Search Button (Spotlight) */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={openSpotlight}
                            className="relative"
                        >
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Language Switcher */}
                        <LanguageSwitcher variant="minimal" />

                        {/* Mobile Menu */}
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild className="lg:hidden">
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80 p-0">
                                <div className="flex flex-col h-full">
                                    {/* Mobile Menu Header */}
                                    <div className="flex items-center justify-between p-4 border-b">
                                        <span className="font-bold text-lg">
                                            <span className="text-navy">AVM</span> Platform
                                        </span>
                                    </div>

                                    {/* Mobile Navigation */}
                                    <nav className="flex-1 p-4 space-y-1">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                            >
                                                <item.icon className="h-5 w-5" />
                                                {t(item.label)}
                                            </Link>
                                        ))}
                                    </nav>

                                    {/* Mobile Menu Footer */}
                                    <div className="p-4 border-t">
                                        <LanguageSwitcher />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
