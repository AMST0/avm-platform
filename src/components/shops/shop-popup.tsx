'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Shop } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Globe } from 'lucide-react';
import { FLOOR_LABELS } from '@/lib/types';

interface ShopPopupProps {
    shop: Shop | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ShopPopup({ shop, open, onOpenChange }: ShopPopupProps) {
    if (!shop) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-0 border-gold/20 bg-navy/95 backdrop-blur-xl text-white overflow-hidden shadow-2xl">
                <div className="flex flex-col">
                    {/* Header Image / Logo Section */}
                    <div className="relative h-48 bg-gradient-to-br from-navy to-black flex items-center justify-center border-b border-gold/10 overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[url('/mall_architecture_about_bg_1768398649063.png')] bg-cover bg-center" />
                        <div className="relative w-32 h-32 bg-white rounded-2xl p-4 shadow-[0_0_50px_rgba(212,175,55,0.3)] flex items-center justify-center transform rotate-2">
                            <img
                                src={shop.logo}
                                alt={shop.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Badge className="bg-gold text-black border-0 uppercase font-black tracking-tighter text-xs">
                                MAĞAZA
                            </Badge>
                            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400 uppercase text-[10px]">
                                {shop.category.toUpperCase()}
                            </Badge>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter">
                            {shop.name}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {/* Location */}
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-gold" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">Konum</p>
                                    <p className="font-semibold">
                                        {FLOOR_LABELS[shop.floor]?.tr || `${shop.floor}. Kat`}
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            {shop.phone && (
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                                        <Phone className="h-6 w-6 text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">İletişim</p>
                                        <a href={`tel:${shop.phone}`} className="font-semibold hover:text-gold transition-colors">
                                            {shop.phone}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Website */}
                            {shop.website && (
                                <div className="md:col-span-2 flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                                        <Globe className="h-6 w-6 text-gold" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">Web Sitesi</p>
                                        <a
                                            href={shop.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold hover:text-gold transition-colors truncate block"
                                        >
                                            {shop.website}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Working Hours Placeholder - Premium addition */}
                            <div className="md:col-span-2 flex items-center gap-4 p-4 rounded-2xl bg-gold/5 border border-gold/20">
                                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-gold" />
                                </div>
                                <div>
                                    <p className="text-xs text-gold uppercase font-bold tracking-widest mb-1">Çalışma Saatleri</p>
                                    <p className="font-semibold">10:00 - 22:00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
