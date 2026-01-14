import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/shared';
import { ChevronRight, ShieldCheck, Lock } from 'lucide-react';

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const tCommon = await getTranslations('common');

    return (
        <>
            <Header />

            <main className="min-h-screen pt-20">
                {/* Minimalist Premium Hero */}
                <section className="relative h-[250px] flex items-center overflow-hidden bg-navy">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/luxury_mall_architecture_about_bg_1768398649063.png"
                            className="w-full h-full object-cover opacity-20 grayscale"
                            alt="Privacy Background"
                        />
                        <div className="absolute inset-0 bg-navy/60" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
                            Gizlilik Politikası
                        </h1>
                        <nav className="flex justify-center items-center gap-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                            <a href={`/${locale}`} className="hover:text-gold transition-colors">{tCommon('home')}</a>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-gold">Gizlilik</span>
                        </nav>
                    </div>
                </section>

                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto bg-white p-12 lg:p-20 rounded-[3rem] shadow-2xl border border-slate-100">
                            <div className="flex items-center gap-4 mb-12 text-gold">
                                <Lock className="w-10 h-10" />
                                <div className="h-px flex-1 bg-gold/20" />
                            </div>

                            <article className="prose prose-slate max-w-none">
                                <h2 className="text-navy font-black text-3xl mb-8 uppercase tracking-tight">Gizliliğiniz Bizim İçin Önemli</h2>
                                <p>
                                    Bu gizlilik politikası, web sitemizi kullanırken topladığımız bilgilerin nasıl kullanıldığını ve korunduğunu açıklamaktadır.
                                </p>

                                <h3 className="text-navy font-bold text-xl mt-12 mb-4">Veri Güvenliği</h3>
                                <p>
                                    Bilgilerinizin güvenliğini sağlamak amacıyla endüstri standartlarında teknolojiler ve güvenlik önlemleri kullanıyoruz.
                                </p>

                                <h3 className="text-navy font-bold text-xl mt-12 mb-4">Çerezler</h3>
                                <p>
                                    Deneyiminizi geliştirmek için çerezleri kullanıyoruz. Çerezler hakkında daha fazla detay için Çerez Politikamızı inceleyebilirsiniz.
                                </p>
                            </article>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
