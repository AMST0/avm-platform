"use client";

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import type { Event, Locale } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit,
    Trash2,
    Calendar,
    Clock,
    MapPin,
    AlertCircle,
    Info,
    Link as LinkIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { ImageUploadWithCrop } from '@/components/admin/image-upload';
import {
    createEventAction,
    updateEventAction,
    deleteEventAction,
    getEventsAction,
    getUpcomingEventsAction,
    getPastEventsAction
} from '@/lib/actions/event.actions';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Slugify utility for Turkish support
const slugify = (text: string) => {
    const trMap: Record<string, string> = {
        'ç': 'c', 'Ç': 'C', 'ğ': 'g', 'Ğ': 'G', 'ı': 'i', 'İ': 'I',
        'ö': 'o', 'Ö': 'O', 'ş': 's', 'Ş': 'S', 'ü': 'u', 'Ü': 'U'
    };
    for (let key in trMap) {
        text = text.replace(new RegExp(key, 'g'), trMap[key]);
    }
    return text.toLowerCase()
        .replace(/[^-a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};

export default function AdminEventsPage() {
    const locale = useLocale() as Locale;
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Form state
    const [formData, setFormData] = useState({
        title: { tr: '', en: '', ru: '', ar: '' },
        slug: '',
        description: { tr: '', en: '', ru: '', ar: '' },
        image: '',
        startDate: '',
        endDate: '',
        location: '',
        isActive: true,
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const [upcoming, past] = await Promise.all([
                getUpcomingEventsAction(),
                getPastEventsAction(),
            ]);
            setUpcomingEvents(upcoming);
            setPastEvents(past);
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Etkinlikler yüklenirken hata oluştu');
        } finally {
            setIsLoading(false);
        }
    };

    const totalEventCount = upcomingEvents.length + pastEvents.length;
    const isLimitReached = totalEventCount >= 20;

    const handleAddNew = () => {
        if (isLimitReached) {
            toast.error('Maksimum 20 etkinlik sınırına ulaştınız.');
            return;
        }
        setEditingEvent(null);
        setFormData({
            title: { tr: '', en: '', ru: '', ar: '' },
            slug: '',
            description: { tr: '', en: '', ru: '', ar: '' },
            image: '',
            startDate: '',
            endDate: '',
            location: '',
            isActive: true,
        });
        setIsFormOpen(true);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            slug: event.slug,
            description: event.description,
            image: event.image,
            startDate: new Date(event.startDate).toISOString().split('T')[0],
            endDate: new Date(event.endDate).toISOString().split('T')[0],
            location: event.location,
            isActive: event.isActive,
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (eventId: string) => {
        if (!confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) return;

        const toastId = toast.loading('Etkinlik siliniyor...');
        try {
            await deleteEventAction(eventId);

            // Immediate UI update
            setUpcomingEvents(prev => prev.filter(e => e.id !== eventId));
            setPastEvents(prev => prev.filter(e => e.id !== eventId));

            toast.success('Etkinlik başarıyla silindi', { id: toastId });
            // Direct fetch to be safe
            fetchEvents();
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Etkinlik silinirken hata oluştu', { id: toastId });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.tr || !formData.description.tr) {
            toast.error('Türkçe başlık ve açıklama zorunludur.');
            return;
        }

        const dataToSave = {
            ...formData,
            startDate: new Date(formData.startDate),
            endDate: new Date(formData.endDate),
        };

        try {
            if (editingEvent) {
                await updateEventAction(editingEvent.id, dataToSave);
                toast.success('Etkinlik güncellendi');
            } else {
                await createEventAction(dataToSave);
                toast.success('Etkinlik oluşturuldu');
            }

            setIsFormOpen(false);
            setEditingEvent(null);
            fetchEvents();
        } catch (error: any) {
            toast.error(error.message || 'Bir hata oluştu');
        }
    };

    const EventTable = ({ events, title }: { events: Event[]; title: string }) => (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{title} ({events.length})</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Etkinlik</TableHead>
                            <TableHead>Tarih</TableHead>
                            <TableHead>Konum</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead className="text-end">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10">
                                    Etkinlik bulunamadı
                                </TableCell>
                            </TableRow>
                        ) : (
                            events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
                                                {event.image ? (
                                                    <img src={event.image} alt={event.title[locale]} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">{event.title[locale]}</p>
                                                <p className="text-xs text-muted-foreground">{event.slug}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            {new Date(event.startDate).toLocaleDateString(locale)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            {event.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {event.isActive ? (
                                            <Badge className="bg-green-500">Aktif</Badge>
                                        ) : (
                                            <Badge variant="outline">Pasif</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(event)}>
                                                    <Edit className="h-4 w-4 me-2" />
                                                    Düzenle
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(event.id)}
                                                    className="text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4 me-2" />
                                                    Sil
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Etkinlik Yönetimi</h1>
                    <p className="text-muted-foreground">
                        AVM etkinliklerini yönetin
                    </p>
                </div>
                <Button
                    onClick={handleAddNew}
                    className="bg-gold hover:bg-gold-light text-black"
                    disabled={isLimitReached}
                >
                    <Plus className="h-4 w-4 me-2" />
                    Yeni Etkinlik {isLimitReached && '(Limit Doldu)'}
                </Button>
            </div>

            {isLimitReached && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/30 text-red-500">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Uyarı</AlertTitle>
                    <AlertDescription>
                        Maksimum 20 etkinlik sınırına ulaştınız. Yeni bir etkinlik eklemek için lütfen eski etkinliklerden birini silin.
                    </AlertDescription>
                </Alert>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-gold" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{upcomingEvents.length + pastEvents.length}</p>
                            <p className="text-sm text-muted-foreground">Toplam Etkinlik</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <Clock className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                            <p className="text-sm text-muted-foreground">Yaklaşan</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{pastEvents.length}</p>
                            <p className="text-sm text-muted-foreground">Geçmiş</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tables */}
            <Tabs defaultValue="upcoming">
                <TabsList>
                    <TabsTrigger value="upcoming">Yaklaşan Etkinlikler</TabsTrigger>
                    <TabsTrigger value="past">Geçmiş Etkinlikler</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="mt-4">
                    <EventTable events={upcomingEvents} title="Yaklaşan Etkinlikler" />
                </TabsContent>
                <TabsContent value="past" className="mt-4">
                    <EventTable events={pastEvents} title="Geçmiş Etkinlikler" />
                </TabsContent>
            </Tabs>

            {/* Form Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingEvent ? 'Etkinlik Düzenle' : 'Yeni Etkinlik Ekle'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Tabs defaultValue="tr">
                            <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="tr">🇹🇷 TR</TabsTrigger>
                                <TabsTrigger value="en">🇬🇧 EN</TabsTrigger>
                                <TabsTrigger value="ru">🇷🇺 RU</TabsTrigger>
                                <TabsTrigger value="ar">🇸🇦 AR</TabsTrigger>
                            </TabsList>

                            {(['tr', 'en', 'ru', 'ar'] as const).map((lang) => (
                                <TabsContent key={lang} value={lang} className="space-y-4 pt-2">
                                    {lang !== 'tr' && (
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[10px] text-blue-400">
                                            <Info className="h-3 w-3" />
                                            Bu alanı boş bırakırsanız Türkçe içerik otomatik olarak kopyalanacaktır.
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <Label>Başlık ({lang.toUpperCase()}) {lang === 'tr' && <span className="text-red-500">*</span>}</Label>
                                        <Input
                                            value={formData.title[lang]}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    title: { ...prev.title, [lang]: val },
                                                    // Auto-generate slug from TR title if not editing an existing event
                                                    slug: (lang === 'tr' && !editingEvent) ? slugify(val) : prev.slug
                                                }));
                                            }}
                                            required={lang === 'tr'}
                                            placeholder={lang === 'tr' ? "Zorunlu alan..." : "Opsiyonel (Boşsa TR kullanılır)"}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Açıklama ({lang.toUpperCase()}) {lang === 'tr' && <span className="text-red-500">*</span>}</Label>
                                        <Textarea
                                            value={formData.description[lang]}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    description: { ...prev.description, [lang]: e.target.value },
                                                }))
                                            }
                                            rows={2}
                                            required={lang === 'tr'}
                                            placeholder={lang === 'tr' ? "Zorunlu alan..." : "Opsiyonel (Boşsa TR kullanılır)"}
                                        />
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label>Slug (URL Uzantısı)</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-[300px]">
                                                <p className="text-xs">
                                                    Etkinliğin web adresindeki (URL) ismidir.
                                                    Örneğin: avm.com/events/<b>yaz-festivali</b>.
                                                    Başlıktan otomatik oluşur.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        value={formData.slug}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                                        className="pl-9"
                                        placeholder="yaz-festivali"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Konum</Label>
                                <Input
                                    value={formData.location}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                                    placeholder="Ana Salon"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Başlangıç Tarihi</Label>
                                <Input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Bitiş Tarihi</Label>
                                <Input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <ImageUploadWithCrop
                                label="Etkinlik Görseli (16:9)"
                                value={formData.image}
                                onChange={(val) => setFormData(prev => ({ ...prev, image: val }))}
                                aspectRatio="16:9"
                                hint="Maksimum 4MB, 16:9 oranında kırpılacaktır."
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Switch
                                checked={formData.isActive}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({ ...prev, isActive: checked }))
                                }
                            />
                            <Label>Aktif</Label>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                                İptal
                            </Button>
                            <Button type="submit" className="bg-gold hover:bg-gold-light text-black">
                                {editingEvent ? 'Güncelle' : 'Oluştur'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
