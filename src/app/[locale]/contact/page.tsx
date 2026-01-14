import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/shared';
import { Button } from '@/components/ui/button';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Facebook,
    Instagram,
    Twitter,
    MessageCircle,
    ArrowRight
} from 'lucide-react';
import { ContactForm } from '@/components/frontend/contact-form';

interface ContactPageProps {
    params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('footer');
    const tContact = await getTranslations('common');

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />

            <main className="flex-grow pt-20">
                {/* Premium Hero with AI Background */}
                <section className="relative py-32 bg-navy overflow-hidden">
                    <img
                        src="/luxury_mall_contact_desk_bg_1768398906592.png"
                        alt="Contact Hero Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                            {t('contact')}
                        </h1>
                        <div className="w-24 h-2 bg-gold mx-auto rounded-full mb-10 shadow-lg shadow-gold/20" />
                        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-medium leading-relaxed">
                            Size en premium alışveriş deneyimini sunmak için buradayız. <br className="hidden md:block" />
                            Her türlü sorunuz ve talebiniz için profesyonel ekibimizle iletişime geçin.
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-4 -mt-16 pb-24 relative z-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                        {/* Elegant Form Card */}
                        <div className="lg:col-span-7 bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 p-8 md:p-12">
                            <div className="mb-10">
                                <h2 className="text-3xl font-black text-navy mb-2 flex items-center gap-3">
                                    <MessageCircle className="w-8 h-8 text-gold" />
                                    Bize Yazın
                                </h2>
                                <p className="text-slate-500 font-medium">Görüşleriniz bizim için değerlidir.</p>
                            </div>
                            <ContactForm />
                        </div>

                        {/* Info Cards Column */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* Contact Details Card */}
                            <div className="flex-1 bg-navy rounded-[2.5rem] p-10 text-white flex flex-col justify-between group overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                    <MapPin className="w-32 h-32" />
                                </div>

                                <div className="relative z-10 space-y-8">
                                    <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                                        İletişim Bilgileri
                                    </h3>

                                    <div className="space-y-8">
                                        <div className="flex items-start gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                <MapPin className="w-6 h-6 text-gold" />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-gold font-black mb-1">Adres</p>
                                                <p className="text-lg font-medium text-white/90 leading-relaxed">
                                                    Atatürk Bulvarı No: 123, <br />
                                                    İstanbul, Türkiye
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                <Phone className="w-6 h-6 text-gold" />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-gold font-black mb-1">Telefon</p>
                                                <a href="tel:+902121234567" className="text-xl font-bold hover:text-gold transition-colors">
                                                    +90 212 123 45 67
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                <Mail className="w-6 h-6 text-gold" />
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-gold font-black mb-1">Email</p>
                                                <a href="mailto:info@avmplatform.com" className="text-xl font-bold hover:text-gold transition-colors">
                                                    info@avmplatform.com
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
                                    <div className="flex gap-4">
                                        <a href="#" className="w-12 h-12 rounded-xl bg-white/5 hover:bg-gold hover:text-navy transition-all flex items-center justify-center border border-white/10">
                                            <Facebook className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="w-12 h-12 rounded-xl bg-white/5 hover:bg-gold hover:text-navy transition-all flex items-center justify-center border border-white/10">
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="w-12 h-12 rounded-xl bg-white/5 hover:bg-gold hover:text-navy transition-all flex items-center justify-center border border-white/10">
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                    </div>
                                    <div className="text-end">
                                        <p className="text-xs uppercase tracking-widest text-gold font-black mb-1">Açılış/Kapanış</p>
                                        <p className="font-bold flex items-center gap-2">
                                            <Clock className="w-4 h-4" /> 10:00 - 22:00
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Minimal Map Bridge */}
                            <div className="h-64 rounded-[2.5rem] bg-slate-100 flex flex-col items-center justify-center group cursor-pointer hover:bg-gold/10 transition-colors border-2 border-dashed border-slate-200">
                                <MapPin className="w-12 h-12 text-slate-300 group-hover:text-gold group-hover:scale-110 transition-all mb-4" />
                                <p className="font-bold text-slate-400 group-hover:text-gold uppercase tracking-widest text-sm">Yol Tarifi Al</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
