"use client";

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getAllSlidersAction, createSliderAction, updateSliderAction, deleteSliderAction, updateSliderOrderAction } from '@/lib/actions/slider.actions';
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
    ExternalLink,
    Loader2
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUploadWithCrop } from '@/components/admin/image-upload';

const LANGUAGES = [
    { code: 'tr', label: 'Türkçe' },
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'ar', label: 'العربية' },
];

export default function AdminSlidersPage() {
    const locale = useLocale() as Locale;
    const [sliders, setSliders] = useState<Slider[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingSlider, setEditingSlider] = useState<Slider | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: { tr: '', en: '', ru: '', ar: '' },
        subtitle: { tr: '', en: '', ru: '', ar: '' },
        image: '',
        mobileImage: '',
        link: '',
        isActive: true,
    });

    const { getOrderedSliders } = useSliderOrderStore();

    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        setIsLoading(true);
        const result = await getAllSlidersAction();
        if (result.success && result.data) {
            const orderedData = getOrderedSliders(result.data);
            setSliders(orderedData);
        }
        setIsLoading(false);
    };

    const handleOpenDialog = (slider?: Slider) => {
        if (!slider && sliders.length >= 5) {
            toast.error('En fazla 5 adet slider ekleyebilirsiniz.');
            return;
        }

        if (slider) {
            setEditingSlider(slider);
            setFormData({
                title: slider.title,
                subtitle: slider.subtitle || { tr: '', en: '', ru: '', ar: '' },
                image: slider.image,
                mobileImage: slider.mobileImage || '',
                link: slider.link || '',
                isActive: slider.isActive,
            });
        } else {
            setEditingSlider(null);
            setFormData({
                title: { tr: '', en: '', ru: '', ar: '' },
                subtitle: { tr: '', en: '', ru: '', ar: '' },
                image: '',
                mobileImage: '',
                link: '',
                isActive: true,
            });
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        if (!formData.title.tr || !formData.image) {
            toast.error('Lütfen zorunlu alanları (Türkçe Başlık ve Görsel) doldurun');
            return;
        }

        setIsSaving(true);
        try {
            if (editingSlider) {
                const result = await updateSliderAction(editingSlider.id, formData);
                if (result.success) {
                    toast.success('Slider güncellendi');
                    fetchSliders();
                    setIsDialogOpen(false);
                } else {
                    toast.error(result.error);
                }
            } else {
                if (sliders.length >= 5) {
                    toast.error('En fazla 5 adet slider ekleyebilirsiniz.');
                    setIsSaving(false);
                    return;
                }
                const result = await createSliderAction({
                    ...formData,
                    order: sliders.length,
                } as any);
                if (result.success) {
                    toast.success('Slider oluşturuldu');
                    fetchSliders();
                    setIsDialogOpen(false);
                } else {
                    toast.error(result.error);
                }
            }
        } catch (error) {
            toast.error('Bir hata oluştu');
        } finally {
            setIsSaving(false);
        }
    };

    const handleToggleActive = async (id: string, isActive: boolean) => {
        const result = await updateSliderAction(id, { isActive });
        if (result.success) {
            setSliders((prev) =>
                prev.map((s) => (s.id === id ? { ...s, isActive } : s))
            );
            toast.success(isActive ? 'Slider aktif edildi' : 'Slider pasif edildi');
        } else {
            toast.error('Durum güncellenemedi');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu slider\'ı silmek istediğinize emin misiniz?')) return;
        const result = await deleteSliderAction(id);
        if (result.success) {
            setSliders((prev) => prev.filter((s) => s.id !== id));
            toast.success('Slider silindi');
        } else {
            toast.error('Slider silinemedi');
        }
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
                <Button
                    className="bg-gold hover:bg-gold-light text-black font-bold"
                    onClick={() => handleOpenDialog()}
                >
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
                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-gold" />
                            Yükleniyor...
                        </div>
                    ) : sliders.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-2xl border-2 border-dashed border-border/50">
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
                                    <div className="w-24 h-14 rounded-lg overflow-hidden bg-muted shrink-0 shadow-sm border border-border/50">
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
                                            <h4 className="font-bold truncate">{slider.title[locale]}</h4>
                                            <Badge
                                                variant={slider.isActive ? 'default' : 'secondary'}
                                                className={slider.isActive ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
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

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Switch
                                            checked={slider.isActive}
                                            onCheckedChange={(checked) => handleToggleActive(slider.id, checked)}
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-gold/10 hover:text-gold"
                                            onClick={() => handleOpenDialog(slider)}
                                        >
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

            {/* Slider Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingSlider ? 'Slider Güncelle' : 'Yeni Slider Ekle'}
                        </DialogTitle>
                        <DialogDescription>
                            Ana sayfa slider alanı için görsel ve metinleri girin. En fazla 5 slider ekleyebilirsiniz. 16:9 görsel önerilir.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        {/* Image Upload */}
                        <ImageUploadWithCrop
                            label="Slider Görseli (16:9)*"
                            value={formData.image}
                            onChange={(val) => setFormData(prev => ({ ...prev, image: val }))}
                            aspectRatio="16:9"
                            hint="Ana görsel (Desktop için 16:9 zorunlu)"
                        />

                        {/* Language Tabs */}
                        <Tabs defaultValue="tr" className="w-full">
                            <TabsList className="grid grid-cols-4 w-full">
                                {LANGUAGES.map(lang => (
                                    <TabsTrigger key={lang.code} value={lang.code}>
                                        {lang.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {LANGUAGES.map(lang => (
                                <TabsContent key={lang.code} value={lang.code} className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <Label>Başlık ({lang.label}){lang.code === 'tr' && '*'}</Label>
                                        <Input
                                            value={formData.title[lang.code as keyof typeof formData.title]}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                title: { ...prev.title, [lang.code]: e.target.value }
                                            }))}
                                            placeholder={`${lang.label} başlık girin...`}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Alt Başlık ({lang.label})</Label>
                                        <Input
                                            value={formData.subtitle[lang.code as keyof typeof formData.subtitle]}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                subtitle: { ...prev.subtitle, [lang.code]: e.target.value }
                                            }))}
                                            placeholder={`${lang.label} alt başlık girin...`}
                                        />
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>

                        {/* Link */}
                        <div className="space-y-2">
                            <Label>Yönlendirme Linki (Opsiyonel)</Label>
                            <Input
                                value={formData.link}
                                onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                                placeholder="Örn: /shops veya https://..."
                            />
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={formData.isActive}
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                                id="active-slider"
                            />
                            <Label htmlFor="active-slider">Slider Aktif</Label>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>
                            İptal
                        </Button>
                        <Button
                            className="bg-gold hover:bg-gold-light text-black font-bold"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
                            {editingSlider ? 'Güncelle' : 'Oluştur'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
