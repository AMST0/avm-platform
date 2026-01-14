"use client";

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Send
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * Magnetic Link Component
 * Creates a subtle attraction effect on hover
 */
function MagneticLink({
    href,
    children,
    external = false,
    className = ""
}: {
    href: string;
    children: React.ReactNode;
    external?: boolean;
    className?: string;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.15;
        const y = (clientY - (top + height / 2)) * 0.15;
        setPosition({ x, y });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    const LinkComponent = external ? 'a' : Link;
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

    return (
        <motion.span
            style={{ display: 'inline-block' }}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <LinkComponent
                ref={ref as React.Ref<HTMLAnchorElement>}
                href={href}
                className={className}
                onMouseMove={handleMouse}
                onMouseLeave={reset}
                {...externalProps}
            >
                {children}
            </LinkComponent>
        </motion.span>
    );
}

/**
 * AMST Footer Component
 * "Digital Architecture by AMST" branding with magnetic hover effect
 */
export function Footer() {
    const t = useTranslations('footer');
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Youtube, href: 'https://youtube.com', label: 'Youtube' },
    ];

    return (
        <footer className="bg-navy text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Brand & About */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">
                            <span className="text-gold">AVM</span> Platform
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Türkiye'nin en modern alışveriş deneyimi.
                            Moda, teknoloji, eğlence ve daha fazlası tek çatı altında.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3 pt-2">
                            {socialLinks.map((social) => (
                                <MagneticLink
                                    key={social.label}
                                    href={social.href}
                                    external
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-black transition-colors duration-300"
                                >
                                    <social.icon className="w-5 h-5" />
                                </MagneticLink>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gold">{t('contact')}</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                <span className="text-white/70">
                                    Atatürk Bulvarı No: 123<br />
                                    İstanbul, Türkiye
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gold shrink-0" />
                                <a href="tel:+902121234567" className="text-white/70 hover:text-white transition-colors">
                                    +90 212 123 45 67
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gold shrink-0" />
                                <a href="mailto:info@avmplatform.com" className="text-white/70 hover:text-white transition-colors">
                                    info@avmplatform.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-gold shrink-0" />
                                <span className="text-white/70">10:00 - 22:00</span>
                            </li>
                        </ul>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gold">Hızlı Erişim</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                { href: '/shops', label: 'Mağazalar' },
                                { href: '/events', label: 'Etkinlikler' },
                                { href: '/contact', label: 'İletişim' },
                                { href: '/about', label: 'Hakkımızda' },
                                { href: '/privacy', label: 'Gizlilik Politikası' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <MagneticLink
                                        href={link.href}
                                        className="text-white/70 hover:text-gold transition-colors inline-block"
                                    >
                                        {link.label}
                                    </MagneticLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gold">{t('newsletter')}</h4>
                        <p className="text-white/70 text-sm">
                            En son kampanya ve etkinliklerden haberdar olun.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder={t('newsletterPlaceholder')}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="bg-gold hover:bg-gold-light text-black shrink-0"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - AMST Signature */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <p className="text-white/50">
                            © {currentYear} AVM Platform. Tüm hakları saklıdır.
                        </p>

                        {/* AMST Signature with Magnetic Effect */}
                        <div className="flex items-center gap-2 text-white/70">
                            <span>{t('digitalArchitecture')}</span>
                            <MagneticLink
                                href="https://ataberkdudu.info"
                                external
                                className="font-bold text-gold hover:text-gold-light transition-colors"
                            >
                                AMST
                            </MagneticLink>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
