"use client";

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getSliders } from '@/lib/data';
import { useSliderOrderStore } from '@/lib/store';
import type { Slider, Locale } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
    Layers,
    Eye,
    EyeOff,
    Plus,
    GripVertical,
    Pencil,
    Trash2,
    Image as ImageIcon,
    ExternalLink
} from 'lucide-react';

export default function AdminSlidersPage() {
    const locale = useLocale() as Locale;
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { orderedIds, setOrderedIds, getOrderedSliders } = useSliderOrderStore();

    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        setIsLoading(true);
        const data = await getSliders();
        // Apply persisted order or fallback to default order
        const orderedData = getOrderedSliders(data);
        setSliders(orderedData);
        setIsLoading(false);
    };

    const handleToggleActive = async (id: string, isActive: boolean) => {
        setSliders((prev) =>
            prev.map((s) => (s.id === id ? { ...s, isActive } : s))
        );
        toast.success(isActive ? 'Slider aktif edildi' : 'Slider pasif edildi');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu slider\'ı silmek istediğinize emin misiniz?')) return;
        setSliders((prev) => prev.filter((s) => s.id !== id));
        toast.success('Slider silindi');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Slider Yönetimi</h1>
                    <p className="text-muted-foreground">
                        Ana sayfa slider&apos;larını yönetin ve sıralayın
                    </p>
                </div>
                <Button className="bg-gold hover:bg-gold-light text-black">
                    <Plus className="h-4 w-4 me-2" />
                    Yeni Slider
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border/50 bg-gradient-to-br from-violet-500/5 to-transparent">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <Layers className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{sliders.length}</p>
                            <p className="text-sm text-muted-foreground">Toplam Slider</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/50 bg-gradient-to-br from-emerald-500/5 to-transparent">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                            <Eye className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {sliders.filter((s) => s.isActive).length}
                            </p>
                            <p className="text-sm text-muted-foreground">Aktif</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-border/50 bg-gradient-to-br from-amber-500/5 to-transparent">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                            <EyeOff className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {sliders.filter((s) => !s.isActive).length}
                            </p>
                            <p className="text-sm text-muted-foreground">Pasif</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Slider List */}
            <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5 text-gold" />
                        Slider Listesi
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                        Sliderları sürükleyerek sıralayabilirsiniz.
                    </p>

                    {isLoading ? (
                        <div className="text-center py-12 text-muted-foreground">
                            Yükleniyor...
                        </div>
                    ) : sliders.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Henüz slider eklenmemiş.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {sliders.map((slider, index) => (
                                <div
                                    key={slider.id}
                                    className="flex items-center gap-4 p-4 bg-accent/30 rounded-xl border border-border/50 hover:border-gold/30 transition-all group"
                                >
                                    {/* Drag Handle */}
                                    <button className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded opacity-50 group-hover:opacity-100 transition-opacity">
                                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                                    </button>

                                    {/* Image Preview */}
                                    <div className="w-24 h-14 rounded-lg overflow-hidden bg-muted shrink-0 shadow-sm">
                                        {slider.image ? (
                                            <img
                                                src={slider.image}
                                                alt={slider.title[locale]}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ImageIcon className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-medium truncate">{slider.title[locale]}</h4>
                                            <Badge
                                                variant={slider.isActive ? 'default' : 'secondary'}
                                                className={slider.isActive ? 'bg-emerald-500' : ''}
                                            >
                                                {slider.isActive ? 'Aktif' : 'Pasif'}
                                            </Badge>
                                        </div>
                                        {slider.subtitle?.[locale] && (
                                            <p className="text-sm text-muted-foreground truncate">
                                                {slider.subtitle[locale]}
                                            </p>
                                        )}
                                        {slider.link && (
                                            <div className="flex items-center gap-1 text-xs text-gold mt-1">
                                                <ExternalLink className="h-3 w-3" />
                                                <span className="truncate">{slider.link}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Order Badge */}
                                    <Badge variant="outline" className="shrink-0 font-mono">
                                        #{index + 1}
                                    </Badge>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Switch
                                            checked={slider.isActive}
                                            onCheckedChange={(checked) => handleToggleActive(slider.id, checked)}
                                        />
                                        <Button variant="ghost" size="icon" className="hover:bg-accent">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(slider.id)}
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
