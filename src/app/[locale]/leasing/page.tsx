import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, MapPin, CheckCircle2, ChevronRight, Phone, Mail } from 'lucide-react';
import type { Locale } from '@/lib/types';
import { LeasingForm } from '@/components/frontend/leasing-form';

export default async function LeasingPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                {/* Hero Section */}
                <section className="relative h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden bg-navy">
                    <div className="absolute inset-0 opacity-40">
                        <img
                            src="/luxury_mall_leasing_bg_1768398194031.png"
                            className="w-full h-full object-cover"
                            alt="Shopping Mall Interior"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
                            Kiralama
                        </h1>
                        <nav className="flex justify-center items-center gap-2 text-white/50 text-sm font-bold uppercase tracking-widest">
                            <a href={`/${locale}`} className="hover:text-gold transition-colors">Ana Sayfa</a>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-gold">Kiralama</span>
                        </nav>
                    </div>
                </section>

                {/* Form Section */}
                <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-5xl mx-auto">
                            <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
                                <div className="p-8 lg:p-16">
                                    <LeasingForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
