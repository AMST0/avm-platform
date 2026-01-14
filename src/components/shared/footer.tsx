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
    Youtube
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
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold uppercase tracking-tighter">
                            <span className="text-gold">AVM</span> Platform
                        </h4>
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

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold uppercase tracking-tighter text-gold">{t('contact')}</h4>
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
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold uppercase tracking-tighter text-gold">Hızlı Erişim</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                { href: '/shops', label: 'Mağazalar' },
                                { href: '/events', label: 'Etkinlikler' },
                                { href: '/leasing', label: 'Kiralama' },
                                { href: '/about', label: 'Hakkımızda' },
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

                    {/* Google Map Location */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold uppercase tracking-tighter text-gold">Konumumuz</h4>
                        <div className="w-full h-40 rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192697.7932762524!2d28.86703248359375!3d41.00269385000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1cc2f9840107b57!2zxLBzdGFuYnVs!5e0!3m2!1sen!2str!4v1705251000000!5m2!1sen!2str"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar - AMST Signature & Legal Links */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                            <p className="text-white/50">
                                © {currentYear} AVM Platform. Tüm hakları saklıdır.
                            </p>
                            <div className="flex gap-4 text-white/30 text-xs">
                                <Link href="/kvkk" className="hover:text-gold transition-colors">KVKK</Link>
                                <Link href="/cookies" className="hover:text-gold transition-colors">Çerezler</Link>
                                <Link href="/terms" className="hover:text-gold transition-colors">Şartlar</Link>
                                <Link href="/privacy" className="hover:text-gold transition-colors">Gizlilik</Link>
                            </div>
                        </div>

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
