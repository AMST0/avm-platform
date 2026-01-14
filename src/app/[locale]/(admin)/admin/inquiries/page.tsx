'use client';

import { useState, useEffect } from 'react';
import { getInquiriesAction, updateInquiryStatusAction, deleteInquiryAction } from '@/lib/actions/inquiry.actions';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Mail,
    Phone,
    Trash2,
    Eye,
    CheckCircle,
    Clock,
    Building2,
    User,
    ChevronRight,
    Search
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Inquiry {
    id: string;
    type: string;
    name: string;
    email: string;
    phone: string;
    message: string | null;
    status: string;
    details: any;
    createdAt: Date;
    updatedAt: Date;
}

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchInquiries();
    }, []);

    async function fetchInquiries() {
        setLoading(true);
        const result = await getInquiriesAction();
        if (result.success && result.data) {
            setInquiries(result.data as Inquiry[]);
        }
        setLoading(false);
    }

    async function handleStatusUpdate(id: string, currentStatus: string) {
        const newStatus = currentStatus === 'pending' ? 'read' : 'pending';
        const result = await updateInquiryStatusAction(id, newStatus);
        if (result.success) {
            setInquiries(inquiries.map(item => item.id === id ? { ...item, status: newStatus } : item));
            toast.success('Durum güncellendi.');
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Bu başvuruyu silmek istediğinize emin misiniz?')) return;
        const result = await deleteInquiryAction(id);
        if (result.success) {
            setInquiries(inquiries.filter(item => item.id !== id));
            toast.success('Başvuru silindi.');
        }
    }

    const filteredInquiries = inquiries.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-navy">Mesajlar ve Başvurular</h1>
                    <p className="text-muted-foreground mt-1">İletişim ve dükkan kiralama taleplerini yönetin.</p>
                </div>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Ara..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="w-full bg-white rounded-[2rem] border shadow-2xl shadow-navy/5 overflow-hidden">
                <Table>
                    <TableHeader className="bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 border-b border-gold/20">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[200px] py-7 px-8 text-navy font-black uppercase text-xs tracking-widest">Tarih / Saat</TableHead>
                            <TableHead className="text-navy font-black uppercase text-xs tracking-widest">Tip</TableHead>
                            <TableHead className="text-navy font-black uppercase text-xs tracking-widest">Ad Soyad</TableHead>
                            <TableHead className="text-navy font-black uppercase text-xs tracking-widest">İletişim Bilgileri</TableHead>
                            <TableHead className="text-navy font-black uppercase text-xs tracking-widest">Durum</TableHead>
                            <TableHead className="text-right px-8 text-navy font-black uppercase text-xs tracking-widest">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredInquiries.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <p className="text-muted-foreground font-medium">
                                            {loading ? 'Veriler hazılanıyor...' : 'Henüz bir başvuru bulunmuyor.'}
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredInquiries.map((item) => (
                                <TableRow key={item.id} className={`group transition-colors ${item.status === 'pending' ? 'bg-gold/5 hover:bg-gold/10' : 'hover:bg-slate-50/50'}`}>
                                    <TableCell className="py-5 px-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-navy">
                                                {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                                            </span>
                                            <span className="text-xs text-muted-foreground font-medium">
                                                {new Date(item.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={item.type === 'leasing' ? 'default' : 'secondary'} className={`rounded-full px-3 py-1 font-bold text-[10px] uppercase tracking-wider ${item.type === 'leasing' ? 'bg-navy text-white' : 'bg-slate-200 text-slate-700'}`}>
                                            {item.type === 'leasing' ? 'Kiralama' : 'İletişim'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-bold text-navy-dark">{item.name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col space-y-1">
                                            <a href={`mailto:${item.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors font-medium">
                                                <Mail className="h-3.5 w-3.5" /> {item.email}
                                            </a>
                                            <a href={`tel:${item.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors font-medium">
                                                <Phone className="h-3.5 w-3.5" /> {item.phone}
                                            </a>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className="cursor-pointer rounded-full font-bold transition-all hover:scale-105 active:scale-95 px-4"
                                            variant={item.status === 'pending' ? 'outline' : 'secondary'}
                                            onClick={() => handleStatusUpdate(item.id, item.status)}
                                        >
                                            {item.status === 'pending' ? 'Bekliyor' : 'Okundu'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right px-6">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-gold/20 hover:text-gold" onClick={() => setSelectedInquiry(item)}>
                                                <Eye className="h-4.5 w-4.5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-destructive/10 text-destructive" onClick={() => handleDelete(item.id)}>
                                                <Trash2 className="h-4.5 w-4.5" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Details Modal */}
            <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            {selectedInquiry?.type === 'leasing' ? <Building2 className="h-5 w-5" /> : <User className="h-5 w-5" />}
                            {selectedInquiry?.type === 'leasing' ? 'Kiralama Başvurusu Detayı' : 'İletişim Mesajı Detayı'}
                        </DialogTitle>
                        <DialogDescription>
                            Gelen başvurunun tüm detaylarını aşağıda görebilirsiniz.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedInquiry && (
                        <div className="space-y-6 pt-4">
                            <div className="grid grid-cols-2 gap-6 bg-accent/30 p-4 rounded-xl">
                                <div>
                                    <p className="text-xs uppercase font-bold text-muted-foreground mb-1">Ad Soyad</p>
                                    <p className="font-semibold">{selectedInquiry.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold text-muted-foreground mb-1">Tarih</p>
                                    <p className="font-semibold">{new Date(selectedInquiry.createdAt).toLocaleString('tr-TR')}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold text-muted-foreground mb-1">Email</p>
                                    <p className="font-semibold underline decoration-gold">{selectedInquiry.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold text-muted-foreground mb-1">Telefon</p>
                                    <p className="font-semibold">{selectedInquiry.phone}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold text-muted-foreground mb-1">Ünvan / Pozisyon</p>
                                    <p className="font-semibold">{selectedInquiry.details?.titleLabel || '-'}</p>
                                </div>
                            </div>

                            {selectedInquiry.type === 'leasing' && selectedInquiry.details && (
                                <div className="space-y-4">
                                    <h4 className="font-bold border-b pb-2">Mağaza Bilgileri</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Firma</p>
                                            <p className="font-medium">{selectedInquiry.details.firmTitle}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Marka</p>
                                            <p className="font-medium text-gold">{selectedInquiry.details.brand}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Min. m²</p>
                                            <p className="font-medium">{selectedInquiry.details.minM2} m²</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Max. m²</p>
                                            <p className="font-medium">{selectedInquiry.details.maxM2} m²</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <h4 className="font-bold border-b pb-2">Mesaj</h4>
                                <div className="p-4 bg-muted rounded-xl min-h-[100px] whitespace-pre-wrap italic">
                                    {selectedInquiry.message || 'Mesaj belirtilmemiş.'}
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={() => setSelectedInquiry(null)}>Kapat</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
