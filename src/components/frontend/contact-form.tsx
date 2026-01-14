'use client';

import { useState } from 'react';
import { createInquiryAction } from '@/lib/actions/inquiry.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            type: 'contact' as const,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            message: formData.get('message') as string,
            details: {
                subject: formData.get('subject') as string
            }
        };

        const result = await createInquiryAction(data);

        if (result.success) {
            setSubmitted(true);
            toast.success('Mesajınız başarıyla iletildi.');
        } else {
            toast.error('Mesaj gönderilirken bir hata oluştu.');
        }
        setLoading(false);
    }

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-navy">Mesajınız Alındı!</h3>
                <p className="text-muted-foreground max-w-sm">
                    En kısa sürede sizinle iletişime geçeceğiz. İlginiz için teşekkür ederiz.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>Yeniden Gönder</Button>
            </div>
        );
    }

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                    <Label htmlFor="name" className="text-sm font-bold text-navy/70 uppercase tracking-wider ml-1">Ad Soyad *</Label>
                    <Input id="name" name="name" placeholder="Adınız Soyadınız" required disabled={loading} className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-gold/20 focus:border-gold transition-all" />
                </div>
                <div className="space-y-2.5">
                    <Label htmlFor="email" className="text-sm font-bold text-navy/70 uppercase tracking-wider ml-1">E-posta *</Label>
                    <Input id="email" name="email" type="email" placeholder="ornek@email.com" required disabled={loading} className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-gold/20 focus:border-gold transition-all" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                    <Label htmlFor="phone" className="text-sm font-bold text-navy/70 uppercase tracking-wider ml-1">Telefon *</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="05xx xxx xx xx" required disabled={loading} className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-gold/20 focus:border-gold transition-all" />
                </div>
                <div className="space-y-2.5">
                    <Label htmlFor="subject" className="text-sm font-bold text-navy/70 uppercase tracking-wider ml-1">Konu</Label>
                    <Input id="subject" name="subject" placeholder="Mesajınızın konusu" disabled={loading} className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-gold/20 focus:border-gold transition-all" />
                </div>
            </div>

            <div className="space-y-2.5">
                <Label htmlFor="message" className="text-sm font-bold text-navy/70 uppercase tracking-wider ml-1">Mesaj *</Label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                    required
                    disabled={loading}
                    className="rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-gold/20 focus:border-gold transition-all resize-none p-4"
                />
            </div>

            <Button type="submit" className="w-full bg-navy hover:bg-navy-light text-white font-black h-16 rounded-2xl text-lg shadow-xl shadow-navy/20 transition-all hover:scale-[1.01] active:scale-[0.99]" disabled={loading}>
                {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                    <>
                        <Send className="h-5 w-5 me-3" />
                        Mesajı İlet
                    </>
                )}
            </Button>
        </form>
    );
}
