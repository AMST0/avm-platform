import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/shared';

interface CookiesPageProps {
    params: Promise<{ locale: string }>;
}

export default async function CookiesPage({ params }: CookiesPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    const t = await getTranslations('footer');

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />

            <main className="flex-grow pt-20">
                {/* Minimalist Hero */}
                <section className="relative py-24 bg-navy overflow-hidden">
                    <div className="absolute inset-0 z-0 opacity-20">
                        <img
                            src="/luxury_mall_contact_desk_bg_1768398906592.png"
                            alt="Cookies Background"
                            className="w-full h-full object-cover grayscale"
                        />
                    </div>
                    <div className="absolute inset-0 bg-navy/80" />

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                            {t('cookies')}
                        </h1>
                        <div className="w-20 h-1.5 bg-gold mx-auto rounded-full" />
                    </div>
                </section>

                <section className="py-24 container mx-auto px-4 max-w-4xl">
                    <div className="prose prose-slate prose-lg max-w-none">
                        <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-12 text-slate-700">
                            <section className="space-y-6">
                                <h2 className="text-3xl font-black text-navy uppercase tracking-tight">Çerezler Hakkında</h2>
                                <p className="leading-relaxed font-medium">
                                    AVM Platform olarak, sizlere daha iyi bir deneyim sunabilmek için web sitemizde çerezler kullanmaktayız.
                                    Bu politika, hangi tür çerezleri neden kullandığımızı açıklamaktadır.
                                </p>
                            </section>

                            <section className="space-y-8 border-t border-slate-200 pt-12">
                                <h2 className="text-3xl font-black text-navy uppercase tracking-tight">Kullandığımız Çerez Türleri</h2>

                                <div className="grid gap-6">
                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                        <h3 className="text-xl font-black text-gold mb-2">Zorunlu Çerezler</h3>
                                        <p className="text-base text-slate-500 font-medium">Web sitemizin temel fonksiyonlarının düzgün çalışması için gerekli olan çerezlerdir.</p>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                        <h3 className="text-xl font-black text-gold mb-2">Performans Çerezleri</h3>
                                        <p className="text-base text-slate-500 font-medium">Sitemizi nasıl kullandığınızı analiz etmemize ve kullanıcı deneyimini iyileştirmemize yardımcı olan çerezlerdir.</p>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                        <h3 className="text-xl font-black text-gold mb-2">Tercih Çerezleri</h3>
                                        <p className="text-base text-slate-500 font-medium">Sitemizdeki dil veya bölge seçimleriniz gibi tercihlerinizin hatırlanmasını sağlayan çerezlerdir.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6 border-t border-slate-200 pt-12">
                                <h2 className="text-3xl font-black text-navy uppercase tracking-tight">Kontrol Sizde</h2>
                                <p className="leading-relaxed font-medium">
                                    Tarayıcı ayarlarınız üzerinden çerezleri dilediğiniz zaman engelleyebilir veya silebilirsiniz.
                                    Ancak bazı çerezlerin engellenmesi, site fonksiyonlarının tam olarak kullanılamamasına neden olabilir.
                                </p>
                            </section>

                            <div className="pt-8 text-sm text-slate-400 font-bold uppercase tracking-widest text-center">
                                Son Güncelleme: Ocak 2024
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
