"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ShopFormData>({
        resolver: zodResolver(shopSchema) as any,
        defaultValues: (initialData as any) || {
            name: '',
            slug: '',
            category: 'fashion',
            floor: 0,
            logo: '',
            phone: '',
            website: '',
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
            if (process.env.NODE_ENV === 'development') console.error(error);
            toast.error('Bir hata oluştu');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Generate shop URL for QR
    const shopUrl = shopSlug
        ? `${typeof window !== 'undefined' ? window.location.origin : ''}/tr/shops/${shopSlug}`
        : '';

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <div className="space-y-6">
                    {/* Main Content */}
                    <div className="space-y-6">

                        {/* Basic Info Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5" />
                                    Temel Bilgiler
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mağaza Adı *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Örn: Zara"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        // Auto-generate slug
                                                        const slug = e.target.value
                                                            .toLowerCase()
                                                            .replace(/[^a-z0-9]+/g, '-')
                                                            .replace(/(^-|-$)+/g, '');
                                                        form.setValue('slug', slug);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


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
                                                                {CATEGORY_LABELS[cat]['tr']}
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
                                                                {FLOOR_LABELS[floor]?.['tr'] || `${floor}. Kat`}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                                </div>

                                {/* Status Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    <FormField
                                        control={form.control}
                                        name="isActive"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>Aktif Durum</FormLabel>
                                                    <FormDescription>
                                                        Mağaza sitede görünür
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
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                                                <div className="space-y-0.5">
                                                    <FormLabel>Öne Çıkan</FormLabel>
                                                    <FormDescription>
                                                        Ana sayfada vitrine çıkar
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
                                </div>

                                {/* Logo Upload */}
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="logo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mağaza Logosu *</FormLabel>
                                                <FormControl>
                                                    <ImageUploadWithCrop
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        aspectRatio="1:1"
                                                        label="Logo Seçin"
                                                        fileName={`${form.getValues('slug') || 'magaza'}-${new Date().toISOString().split('T')[0]}.png`}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

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
        </Form >
    );
}
