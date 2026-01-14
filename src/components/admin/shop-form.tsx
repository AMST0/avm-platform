"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations, useLocale } from 'next-intl';
import { shopSchema, type ShopFormData, type ShopInput } from '@/lib/schemas';
import { CATEGORY_LABELS, FLOOR_LABELS, type ShopCategory, type Locale } from '@/lib/types';
import { ImageUploadWithCrop } from './image-upload';
import { QRCodeGenerator } from './qr-code-generator';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
    Save,
    Image as ImageIcon,
    QrCode,
    Star,
    Building
} from 'lucide-react';

interface ShopFormProps {
    initialData?: ShopFormData;
    shopSlug?: string;
    onSubmit: (data: ShopFormData) => Promise<void>;
    onCancel?: () => void;
}

const categories: ShopCategory[] = [
    'fashion', 'electronics', 'food', 'entertainment', 'health',
    'home', 'jewelry', 'sports', 'cosmetics', 'services'
];

const floors = [-1, 0, 1, 2, 3, 4];

export function ShopForm({ initialData, shopSlug, onSubmit }: ShopFormProps) {
    const t = useTranslations('admin');
    const locale = useLocale() as Locale;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ShopFormData>({
        resolver: zodResolver(shopSchema),
        defaultValues: initialData || {
            name: '',
            slug: '',
            category: 'fashion',
            floor: 0,
            logo: '',
            phone: '',
            website: '',
            workingHours: '',
            featured: false,
            isActive: true,
        },
    });

    const handleSubmit = async (data: ShopFormData) => {
        setIsSubmitting(true);
        try {
            await onSubmit(data);
            toast.success(t('saveSuccess'));
        } catch (error) {
            toast.error('Bir hata oluştu');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Generate shop URL for QR
    const shopUrl = shopSlug
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}/${locale}/shops/${shopSlug}`
        : '';

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content - 2 Columns */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Basic Info Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5" />
                                    Temel Bilgiler
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mağaza Adı *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Örn: Zara" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="slug"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>URL Slug *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Örn: zara" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    Sadece küçük harf, rakam ve tire
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Kategori *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Kategori seçin" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {categories.map((cat) => (
                                                            <SelectItem key={cat} value={cat}>
                                                                {CATEGORY_LABELS[cat][locale]}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="floor"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Kat *</FormLabel>
                                                <Select
                                                    onValueChange={(val) => field.onChange(parseInt(val))}
                                                    defaultValue={field.value.toString()}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Kat seçin" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {floors.map((floor) => (
                                                            <SelectItem key={floor} value={floor.toString()}>
                                                                {FLOOR_LABELS[floor]?.[locale] || `${floor}. Kat`}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Telefon</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+90 212 123 45 67" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="website"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Web Sitesi</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="workingHours"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Çalışma Saatleri</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="10:00 - 22:00" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description and SEO cards removed */}
                    </div>

                    {/* Sidebar - 2 Columns */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Images Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ImageIcon className="h-5 w-5" />
                                    Görseller
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="logo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <ImageUploadWithCrop
                                                value={field.value}
                                                onChange={field.onChange}
                                                aspectRatio="1:1"
                                                label="Logo *"
                                                hint="Kare format (1:1)"
                                                error={form.formState.errors.logo?.message}
                                            />
                                        </FormItem>
                                    )}
                                />

                                {/* Banner upload removed */}
                            </CardContent>
                        </Card>

                        {/* Status Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Star className="h-5 w-5" />
                                    Durum
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="isActive"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 gap-3">
                                            <div className="flex-1 min-w-0">
                                                <FormLabel className="text-sm font-medium">Aktif</FormLabel>
                                                <FormDescription className="text-xs">
                                                    Sitede görünür
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="featured"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 gap-3">
                                            <div className="flex-1 min-w-0">
                                                <FormLabel className="text-sm font-medium">Öne Çıkan</FormLabel>
                                                <FormDescription className="text-xs">
                                                    Ana sayfada göster
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* QR Code Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <QrCode className="h-5 w-5" />
                                    QR Kod
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <QRCodeGenerator
                                    url={shopUrl}
                                    shopName={form.watch('name') || 'shop'}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline">
                        İptal
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gold hover:bg-gold-light text-black"
                    >
                        <Save className="h-4 w-4 me-2" />
                        {isSubmitting ? 'Kaydediliyor...' : t('save')}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
