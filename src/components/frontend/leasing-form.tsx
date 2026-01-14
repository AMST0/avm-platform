'use client';

import { useState } from 'react';
import { createInquiryAction } from '@/lib/actions/inquiry.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { useTranslations } from 'next-intl';

export function LeasingForm() {
    const t = useTranslations('leasing');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);

        const data = {
            type: 'leasing' as const,
            name: formData.get('nameSurname') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            message: formData.get('message') as string,
            details: {
                firmTitle: formData.get('firmTitle'),
                brand: formData.get('brand'),
                minM2: formData.get('minM2'),
                maxM2: formData.get('maxM2'),
                titleLabel: formData.get('titleLabel'),
            }
        };

        const result = await createInquiryAction(data);

        if (result.success) {
            setSubmitted(true);
            toast.success(t('formSuccess'));
        } else {
            toast.error('Bir hata oluştu.');
        }
        setLoading(false);
    }

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-navy">{t('formSuccess')}</h3>
                <Button variant="outline" onClick={() => setSubmitted(false)}>Yeni Başvuru</Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left Side: Store Info */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-navy flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-gold rounded-full" />
                            {t('sectionStore')}
                        </h3>
                        <div className="h-px w-full bg-border/50" />
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-muted-foreground">{t('firmTitle')}*</label>
                            <Input name="firmTitle" required className="rounded-xl border-border/60 bg-accent/5 focus:border-gold focus:ring-1 focus:ring-gold" disabled={loading} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-muted-foreground">{t('brand')}*</label>
                            <Input name="brand" required className="rounded-xl border-border/60 bg-accent/5 focus:border-gold focus:ring-1 focus:ring-gold" disabled={loading} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-muted-foreground">{t('minM2')}*</label>
                                <Input name="minM2" type="number" required className="rounded-xl border-border/60 bg-accent/5 focus:border-gold focus:ring-1 focus:ring-gold" disabled={loading} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-muted-foreground">{t('maxM2')}*</label>
                                <Input name="maxM2" type="number" required className="rounded-xl border-border/60 bg-accent/5 focus:border-gold focus:ring-1 focus:ring-gold" disabled={loading} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Info */}
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-navy flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-gold rounded-full" />
                            {t('sectionContact')}
                        </h3>
                        <div className="h-px w-full bg-border/50" />
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-muted-foreground">{t('nameSurname')}*</label>
                            <Input name="nameSurname" required className="rounded-xl border-border/60 bg-accent/5 focus:border-gold focus:ring-1 focus:ring-gold" disabled={loading} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-muted-foreground">{t('titleLabel')}</label>
                            <Input name="titleLabel" className="rounded-xl border-border/60 bg-accent/5 focus:border-gold focus:ring-1 focus:ring-gold" disabled={loading} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-muted-foreground">{t('email')}*</label>
                            <Input name="email" type="email" required className="rounded-xl border-border/60 bg-accent/5 focus:border-gold focus:ring-1 focus:ring-gold" disabled={loading} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-muted-foreground">{t('phone')}*</label>
                            <Input name="phone" type="tel" required className="rounded-xl border-border/60 bg-accent/5 focus:border-gold focus:ring-1 focus:ring-gold" disabled={loading} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-muted-foreground">{t('message')}</label>
                            <Textarea name="message" className="rounded-xl border-border/60 bg-accent/5 focus:border-gold focus:ring-1 focus:ring-gold min-h-[100px]" disabled={loading} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Consent and Submit */}
            <div className="mt-12 space-y-8 pt-8 border-t border-border/50">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <Checkbox id="kvkk" required className="mt-1 flex-shrink-0" disabled={loading} />
                        <label htmlFor="kvkk" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                            {t('kvkk')}
                        </label>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button type="submit" disabled={loading} className="h-16 px-16 rounded-2xl bg-gold hover:bg-gold-light text-navy-dark font-black text-xl shadow-2xl shadow-gold/20 transition-all hover:scale-105">
                        {loading ? <Loader2 className="h-8 w-8 animate-spin" /> : t('submit')}
                    </Button>
                </div>
            </div>
        </form>
    );
}
