"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from 'next-intl';
import { popupSchema, type PopupFormData } from '@/lib/schemas';
import type { Popup, Locale } from '@/lib/types';
import { ImageUploadWithCrop } from './image-upload';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Megaphone, Eye, EyeOff, Clock, Repeat } from 'lucide-react';

interface PopupManagerProps {
    popups: Popup[];
    onAdd: (data: PopupFormData) => Promise<void>;
    onEdit: (id: string, data: PopupFormData) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onToggleActive: (id: string, isActive: boolean) => Promise<void>;
}

export function PopupManager({
    popups,
    onAdd,
    onEdit,
    onDelete,
    onToggleActive,
}: PopupManagerProps) {
    const locale = useLocale() as Locale;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingPopup, setEditingPopup] = useState<Popup | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<PopupFormData>({
        resolver: zodResolver(popupSchema),
        defaultValues: {
            title: { tr: '', en: '', ru: '', ar: '' },
            image: '',
            link: '',
            frequency: 'once',
            isActive: true,
        },
    });

    const handleOpenCreate = () => {
        setEditingPopup(null);
        form.reset({
            title: { tr: '', en: '', ru: '', ar: '' },
            image: '',
            link: '',
            frequency: 'once',
            isActive: true,
        });
        setDialogOpen(true);
    };

    const handleOpenEdit = (popup: Popup) => {
        setEditingPopup(popup);
        form.reset({
            title: popup.title,
            image: popup.image,
            link: popup.link || '',
            frequency: popup.frequency,
            isActive: popup.isActive,
        });
        setDialogOpen(true);
    };

    const handleSubmit = async (data: PopupFormData) => {
        setIsSubmitting(true);
        try {
            if (editingPopup) {
                await onEdit(editingPopup.id, data);
                toast.success('Popup güncellendi');
            } else {
                await onAdd(data);
                toast.success('Popup oluşturuldu');
            }
            setDialogOpen(false);
        } catch {
            toast.error('Bir hata oluştu');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Bu popup\'ı silmek istediğinize emin misiniz?')) return;

        try {
            await onDelete(id);
            toast.success('Popup silindi');
        } catch {
            toast.error('Popup silinemedi');
        }
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Megaphone className="h-5 w-5" />
                        Popup Yönetimi
                    </CardTitle>
                    <Button onClick={handleOpenCreate} className="bg-gold hover:bg-gold-light text-black">
                        <Plus className="h-4 w-4 me-2" />
                        Yeni Popup
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {popups.map((popup) => (
                            <div
                                key={popup.id}
                                className="flex items-center gap-4 p-4 bg-accent/30 rounded-lg"
                            >
                                {/* Image Preview */}
                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                                    {popup.image ? (
                                        <img
                                            src={popup.image}
                                            alt={popup.title[locale]}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Megaphone className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-medium truncate">{popup.title[locale]}</h4>
                                        <Badge variant={popup.isActive ? 'default' : 'secondary'}>
                                            {popup.isActive ? (
                                                <>
                                                    <Eye className="h-3 w-3 me-1" />
                                                    Aktif
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff className="h-3 w-3 me-1" />
                                                    Pasif
                                                </>
                                            )}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        {popup.frequency === 'once' ? (
                                            <Badge variant="outline" className="gap-1">
                                                <Clock className="h-3 w-3" />
                                                Bir Kez
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="gap-1">
                                                <Repeat className="h-3 w-3" />
                                                Her Zaman
                                            </Badge>
                                        )}
                                        {popup.link && (
                                            <span className="truncate text-gold">{popup.link}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 shrink-0">
                                    <Switch
                                        checked={popup.isActive}
                                        onCheckedChange={(checked) => onToggleActive(popup.id, checked)}
                                    />
                                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(popup)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(popup.id)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {popups.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Henüz popup eklenmemiş.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Create/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>
                            {editingPopup ? 'Popup Düzenle' : 'Yeni Popup'}
                        </DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                            {/* Title (Multi-language) */}
                            <div>
                                <FormLabel>Başlık *</FormLabel>
                                <Tabs defaultValue="tr" className="mt-2">
                                    <TabsList className="grid w-full grid-cols-4">
                                        <TabsTrigger value="tr">🇹🇷</TabsTrigger>
                                        <TabsTrigger value="en">🇬🇧</TabsTrigger>
                                        <TabsTrigger value="ru">🇷🇺</TabsTrigger>
                                        <TabsTrigger value="ar">🇸🇦</TabsTrigger>
                                    </TabsList>

                                    {(['tr', 'en', 'ru', 'ar'] as const).map((lang) => (
                                        <TabsContent key={lang} value={lang}>
                                            <FormField
                                                control={form.control}
                                                name={`title.${lang}`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                placeholder={`Başlık (${lang.toUpperCase()})`}
                                                                className={lang === 'ar' ? 'text-right' : ''}
                                                                dir={lang === 'ar' ? 'rtl' : 'ltr'}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </div>

                            {/* Image */}
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <ImageUploadWithCrop
                                            value={field.value}
                                            onChange={field.onChange}
                                            aspectRatio="16:9"
                                            label="Görsel *"
                                            error={form.formState.errors.image?.message}
                                        />
                                    </FormItem>
                                )}
                            />

                            {/* Link */}
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Link (Opsiyonel)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Frequency */}
                            <FormField
                                control={form.control}
                                name="frequency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gösterim Sıklığı</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="once">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        Bir Kez (Session başına)
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="always">
                                                    <div className="flex items-center gap-2">
                                                        <Repeat className="h-4 w-4" />
                                                        Her Zaman
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Active */}
                            <FormField
                                control={form.control}
                                name="isActive"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between rounded-lg border p-3">
                                        <FormLabel>Aktif</FormLabel>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                    İptal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-gold hover:bg-gold-light text-black"
                                >
                                    {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
}
