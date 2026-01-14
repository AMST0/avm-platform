"use client";

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getShopsAction, toggleShopActiveAction, deleteShopAction, createShopAction, updateShopAction } from '@/lib/actions/shop.actions';
import type { Shop, Locale } from '@/lib/types';
import { CATEGORY_LABELS, FLOOR_LABELS } from '@/lib/types';
import type { ShopFormData } from '@/lib/schemas';
import { ShopForm } from '@/components/admin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
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
    Store,
    Eye,
    EyeOff
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminShopsPage() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingShop, setEditingShop] = useState<Shop | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchShops();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            setFilteredShops(
                shops.filter((shop) =>
                    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredShops(shops);
        }
    }, [searchQuery, shops]);

    const fetchShops = async () => {
        setIsLoading(true);
        const data = await getShopsAction();
        setShops(data);
        setFilteredShops(data);
        setIsLoading(false);
    };

    const handleAddNew = () => {
        setEditingShop(null);
        setIsFormOpen(true);
    };

    const handleEdit = (shop: Shop) => {
        setEditingShop(shop);
        setIsFormOpen(true);
    };

    const handleDelete = async (shopId: string) => {
        try {
            await deleteShopAction(shopId);
            setShops((prev) => prev.filter((s) => s.id !== shopId));
            toast.success('Mağaza silindi');
        } catch (error) {
            toast.error('Mağaza silinirken bir hata oluştu');
        }
    };

    const handleToggleActive = async (shopId: string, isActive: boolean) => {
        try {
            await toggleShopActiveAction(shopId, isActive);
            setShops((prev) =>
                prev.map((s) => (s.id === shopId ? { ...s, isActive } : s))
            );
            toast.success(isActive ? 'Mağaza aktif edildi' : 'Mağaza pasif edildi');
        } catch (error) {
            toast.error('Giriş yapılamadı');
        }
    };

    const handleFormSubmit = async (data: ShopFormData) => {
        try {
            if (editingShop) {
                const updatedShop = await updateShopAction(editingShop.id, data);
                setShops((prev) =>
                    prev.map((s) => (s.id === editingShop.id ? updatedShop : s))
                );
                toast.success('Mağaza güncellendi');
            } else {
                const newShop = await createShopAction(data);
                setShops((prev) => [...prev, newShop]);
                toast.success('Mağaza oluşturuldu');
            }
            setIsFormOpen(false);
            setEditingShop(null);
        } catch (error) {
            console.error(error);
            toast.error('Bir hata oluştu');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Mağaza Yönetimi</h1>
                    <p className="text-muted-foreground">
                        AVM'deki tüm mağazaları yönetin
                    </p>
                </div>
                <Button onClick={handleAddNew} className="bg-gold hover:bg-gold-light text-black">
                    <Plus className="h-4 w-4 me-2" />
                    Yeni Mağaza
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                            <Store className="h-6 w-6 text-gold" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{shops.length}</p>
                            <p className="text-sm text-muted-foreground">Toplam Mağaza</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <Eye className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {shops.filter((s) => s.isActive).length}
                            </p>
                            <p className="text-sm text-muted-foreground">Aktif</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <EyeOff className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {shops.filter((s) => !s.isActive).length}
                            </p>
                            <p className="text-sm text-muted-foreground">Pasif</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Store className="h-6 w-6 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {shops.filter((s) => s.featured).length}
                            </p>
                            <p className="text-sm text-muted-foreground">Öne Çıkan</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search & Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Mağaza Listesi</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Mağaza ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="ps-9"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mağaza</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Kat</TableHead>
                                <TableHead>Durum</TableHead>
                                <TableHead>Öne Çıkan</TableHead>
                                <TableHead className="text-end">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">
                                        Yükleniyor...
                                    </TableCell>
                                </TableRow>
                            ) : filteredShops.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">
                                        Mağaza bulunamadı
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredShops.map((shop) => (
                                    <TableRow key={shop.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
                                                    {shop.logo ? (
                                                        <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Store className="h-5 w-5 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{shop.name}</p>
                                                    <p className="text-xs text-muted-foreground">{shop.slug}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {CATEGORY_LABELS[shop.category]?.['tr'] || shop.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {FLOOR_LABELS[shop.floor]?.['tr'] || `${shop.floor}. Kat`}
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={shop.isActive}
                                                onCheckedChange={(checked) => handleToggleActive(shop.id, checked)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {shop.featured ? (
                                                <Badge className="bg-gold text-black">Evet</Badge>
                                            ) : (
                                                <Badge variant="outline">Hayır</Badge>
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
                                                    <DropdownMenuItem onClick={() => handleEdit(shop)}>
                                                        <Edit className="h-4 w-4 me-2" />
                                                        Düzenle
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(shop.id)}
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

            {/* Form Dialog */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingShop ? 'Mağaza Düzenle' : 'Yeni Mağaza Ekle'}
                        </DialogTitle>
                        <DialogDescription>
                            Mağaza bilgilerini buradan güncelleyebilirsiniz. Değişiklikleri kaydetmeyi unutmayın.
                        </DialogDescription>
                    </DialogHeader>
                    <ShopForm
                        initialData={editingShop || undefined}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setIsFormOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
