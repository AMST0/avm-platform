import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/shared';
import { ChevronRight, Award, Target, Users2, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/lib/types';

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('about');
    const tCommon = await getTranslations('common');

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                {/* Premium Hero Section */}
                <section className="relative h-[400px] lg:h-[500px] flex items-center overflow-hidden bg-navy">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/luxury_mall_architecture_about_bg_1768398649063.png"
                            className="w-full h-full object-cover"
                            alt="Shopping Mall Architecture"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl lg:text-8xl font-black text-white mb-6 uppercase tracking-tighter">
                                {t('title')}
                            </h1>
                            <div className="w-24 h-2 bg-gold rounded-full mb-8" />
                            <nav className="flex items-center gap-2 text-white/50 text-sm font-bold uppercase tracking-widest">
                                <a href={`/${locale}`} className="hover:text-gold transition-colors">{tCommon('home')}</a>
                                <ChevronRight className="w-4 h-4" />
                                <span className="text-gold">{t('title')}</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Content Sections */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-gold font-bold uppercase tracking-widest text-sm">Vizyonumuz</h2>
                                    <h3 className="text-4xl lg:text-5xl font-black text-navy leading-tight">
                                        Geleceğin Alışveriş Deneyimini Bugünden Şekillendiriyoruz
                                    </h3>
                                </div>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    2010 yılında kapılarımızı açtığımızdan beri, sadece bir alışveriş merkezi değil, aynı zamanda bir yaşam merkezi olma hedefiyle ilerliyoruz.
                                    Modern mimarimiz, seçkin marka karmamız ve her geçen gün gelişen hizmet anlayışımızla bölgenin en prestijli noktası olmaktan gurur duyuyoruz.
                                </p>
                                <div className="grid grid-cols-2 gap-8 pt-8">
                                    <div className="space-y-2">
                                        <div className="text-4xl font-black text-gold">200+</div>
                                        <div className="text-navy font-bold">Seçkin Mağaza</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-4xl font-black text-gold">15M+</div>
                                        <div className="text-navy font-bold">Yıllık Ziyaretçi</div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80"
                                        className="w-full h-full object-cover"
                                        alt="Modern Lifestyle"
                                    />
                                </div>
                                <div className="absolute -bottom-10 -left-10 bg-gold p-10 rounded-[2rem] shadow-2xl hidden lg:block">
                                    <Award className="w-16 h-16 text-navy" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-24 bg-slate-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                            <h2 className="text-gold font-bold uppercase tracking-widest text-sm">Değerlerimiz</h2>
                            <h3 className="text-4xl font-black text-navy uppercase tracking-tighter">Bizi Biz Yapan Prensipler</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: Target, title: 'Mükemmeliyet', desc: 'Her detayda en yüksek kaliteyi ve kusursuz hizmeti hedefliyoruz.' },
                                { icon: Users2, title: 'Misafir Odaklılık', desc: 'Ziyaretçilerimizin konforu ve mutluluğu her zaman önceliğimizdir.' },
                                { icon: ShieldCheck, title: 'Güvenilirlik', desc: 'Şeffaf ve etik iş anlayışımızla tüm paydaşlarımıza güven veriyoruz.' }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-12 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 group">
                                    <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-8 group-hover:bg-gold transition-colors">
                                        <item.icon className="w-8 h-8 text-gold group-hover:text-navy transition-colors" />
                                    </div>
                                    <h4 className="text-2xl font-black text-navy mb-4 uppercase tracking-tighter">{item.title}</h4>
                                    <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
