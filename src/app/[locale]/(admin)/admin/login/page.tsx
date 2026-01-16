"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Lock, Mail, ArrowRight, Shield } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const locale = useLocale();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Giriş başarılı!');
                router.push(`/${locale}/admin/overview`);
                router.refresh();
            } else {
                toast.error(data.error || 'Giriş başarısız');
            }
        } catch (error) {
            toast.error('Bir hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 end-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center shadow-lg shadow-gold/30 mb-4">
                            <Shield className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-white">
                            Admin Girişi
                        </CardTitle>
                        <p className="text-white/50 text-sm mt-2">
                            AVM Platform yönetim paneline hoş geldiniz
                        </p>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white/70">
                                    E-posta
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="admin@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="ps-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-white/70">
                                    Şifre
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/30" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="ps-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-gold focus:ring-gold"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-gold to-amber-600 hover:from-gold-light hover:to-amber-500 text-black font-semibold py-6 transition-all duration-300"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        Giriş yapılıyor...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Giriş Yap
                                        <ArrowRight className="h-5 w-5" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="text-center mt-6 space-y-2">
                    <p className="text-white/30 text-xs">
                        © 2024 AVM Platform. Tüm hakları saklıdır.
                    </p>
                    <p className="text-white/20 text-xs">
                        Made by{' '}
                        <a
                            href="https://ataberkdudu.info"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold/60 hover:text-gold transition-colors"
                        >
                            AMST
                        </a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
