import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Header, Footer } from '@/components/shared';

interface TermsPageProps {
    params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: TermsPageProps) {
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
                            src="/luxury_mall_architecture_about_bg_1768398649063.png"
                            alt="Terms Background"
                            className="w-full h-full object-cover grayscale"
                        />
                    </div>
                    <div className="absolute inset-0 bg-navy/80" />

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                            {t('terms')}
                        </h1>
                        <div className="w-20 h-1.5 bg-gold mx-auto rounded-full" />
                    </div>
                </section>

                <section className="py-24 container mx-auto px-4 max-w-4xl">
                    <div className="prose prose-slate prose-lg max-w-none">
                        <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-12 text-slate-700">
                            <section className="space-y-6">
                                <h2 className="text-3xl font-black text-navy uppercase tracking-tight">1. Kabul Edilme</h2>
                                <p className="leading-relaxed font-medium">
                                    Bu web sitesini kullanarak, aşağıda belirtilen kullanım koşullarını tamamen kabul etmiş sayılırsınız.
                                    Koşulları kabul etmiyorsanız, lütfen siteyi kullanmayı bırakınız.
                                </p>
                            </section>

                            <section className="space-y-6 border-t border-slate-200 pt-12">
                                <h2 className="text-3xl font-black text-navy uppercase tracking-tight">2. Fikri Mülkiyet</h2>
                                <p className="leading-relaxed font-medium">
                                    Sitede yer alan tüm metinler, grafikler, logolar, resimler ve yazılımlar AVM Platform'a aittir ve telif hakları yasalarıyla korunmaktadır.
                                    İzinsiz kullanımı yasaktır.
                                </p>
                            </section>

                            <section className="space-y-6 border-t border-slate-200 pt-12">
                                <h2 className="text-3xl font-black text-navy uppercase tracking-tight">3. Sorumluluk Sınırları</h2>
                                <p className="leading-relaxed font-medium">
                                    AVM Platform, web sitesindeki bilgilerin doğruluğu ve güncelliği için azami çaba gösterir. Ancak, sitedeki teknik hatalardan,
                                    eksikliklerden veya gecikmelerden dolayı oluşabilecek doğrudan veya dolaylı zararlardan sorumlu tutulamaz.
                                </p>
                            </section>

                            <section className="space-y-6 border-t border-slate-200 pt-12">
                                <h2 className="text-3xl font-black text-navy uppercase tracking-tight">4. Değişiklik Hakları</h2>
                                <p className="leading-relaxed font-medium">
                                    AVM Platform, bu kullanım koşullarını dilediği zaman önceden haber vermeksizin değiştirme hakkını saklı tutar.
                                    Güncel koşullar site üzerinde yayınlandığı andan itibaren geçerlilik kazanır.
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
