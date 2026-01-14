"use client";

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getPopups } from '@/lib/data';
import type { Popup, Locale } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
    MessageSquare,
    Eye,
    EyeOff,
    Plus,
    Pencil,
    Trash2,
    Clock,
    Repeat,
    ExternalLink
} from 'lucide-react';

export default function AdminPopupsPage() {
    const locale = useLocale() as Locale;
    const [popups, setPopups] = useState<Popup[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPopups();
    }, []);

    const fetchPopups = async () => {
        setIsLoading(true);
        const data = await getPopups();
        setPopups(data);
        setIsLoading(false);
    };

    const handleToggleActive = async (id: string, isActive: boolean) => {
        setPopups((prev) =>
            prev.map((p) => (p.id === id ? { ...p, isActive } : p))
        );
        toast.success(isActive ? 'Popup aktif edildi' : 'Popup pasif edildi');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu popup\'ı silmek istediğinize emin misiniz?')) return;
        setPopups((prev) => prev.filter((p) => p.id !== id));
        toast.success('Popup silindi');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Popup Yönetimi</h1>
                    <p className="text-muted-foreground">
                        Kullanıcılara gösterilecek popup&apos;ları yönetin
                    </p>
                </div>
                <Button className="bg-gold hover:bg-gold-light text-black">
                    <Plus className="h-4 w-4 me-2" />
                    Yeni Popup
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border/50 bg-gradient-to-br from-cyan-500/5 to-transparent">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                            <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{popups.length}</p>
                            <p className="text-sm text-muted-foreground">Toplam Popup</p>
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
                                {popups.filter((p) => p.isActive).length}
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
                                {popups.filter((p) => !p.isActive).length}
                            </p>
                            <p className="text-sm text-muted-foreground">Pasif</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Popup List */}
            <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-gold" />
                        Popup Listesi
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-12 text-muted-foreground">
                            Yükleniyor...
                        </div>
                    ) : popups.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Henüz popup eklenmemiş.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {popups.map((popup) => (
                                <div
                                    key={popup.id}
                                    className="relative overflow-hidden rounded-xl border border-border/50 hover:border-gold/30 transition-all group"
                                >
                                    {/* Image */}
                                    <div className="h-32 bg-muted">
                                        {popup.image ? (
                                            <img
                                                src={popup.image}
                                                alt={popup.title[locale]}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <MessageSquare className="h-10 w-10 text-muted-foreground/50" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Status Badge */}
                                    <Badge
                                        variant={popup.isActive ? 'default' : 'secondary'}
                                        className={`absolute top-3 end-3 ${popup.isActive ? 'bg-emerald-500' : ''}`}
                                    >
                                        {popup.isActive ? (
                                            <><Eye className="h-3 w-3 me-1" /> Aktif</>
                                        ) : (
                                            <><EyeOff className="h-3 w-3 me-1" /> Pasif</>
                                        )}
                                    </Badge>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h4 className="font-medium mb-2">{popup.title[locale]}</h4>

                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge variant="outline" className="gap-1">
                                                {popup.frequency === 'once' ? (
                                                    <><Clock className="h-3 w-3" /> Bir Kez</>
                                                ) : (
                                                    <><Repeat className="h-3 w-3" /> Her Zaman</>
                                                )}
                                            </Badge>

                                            {popup.link && (
                                                <div className="flex items-center gap-1 text-xs text-gold truncate">
                                                    <ExternalLink className="h-3 w-3 shrink-0" />
                                                    <span className="truncate">{popup.link}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                                            <Switch
                                                checked={popup.isActive}
                                                onCheckedChange={(checked) => handleToggleActive(popup.id, checked)}
                                            />
                                            <span className="text-sm text-muted-foreground flex-1">
                                                {popup.isActive ? 'Aktif' : 'Pasif'}
                                            </span>
                                            <Button variant="ghost" size="icon" className="hover:bg-accent">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(popup.id)}
                                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
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
