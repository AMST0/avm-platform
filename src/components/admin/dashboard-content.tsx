"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import {
    Store,
    Calendar,
    Layers,
    MessageSquare,
    TrendingUp,
    Users,
    Eye,
    Clock,
    ArrowUpRight,
    Sparkles,
    Zap
} from 'lucide-react';

const stats = [
    {
        title: 'Toplam Mağaza',
        value: 23,
        icon: Store,
        gradient: 'from-violet-500 to-purple-600',
        href: '/admin/shops',
    },
    {
        title: 'Yaklaşan Etkinlik',
        value: 4,
        icon: Calendar,
        gradient: 'from-amber-500 to-orange-600',
        href: '/admin/events',
    },
    {
        title: 'Aktif Slider',
        value: 3,
        icon: Layers,
        gradient: 'from-cyan-500 to-blue-600',
        href: '/admin/sliders',
    },
    {
        title: 'Aktif Popup',
        value: 1,
        icon: MessageSquare,
        gradient: 'from-emerald-500 to-green-600',
        href: '/admin/popups',
    },
];

const quickActions = [
    { label: 'Mağaza Yönetimi', href: '/admin/shops', icon: Store },
    { label: 'Etkinlik Yönetimi', href: '/admin/events', icon: Calendar },
    { label: 'Slider Yönetimi', href: '/admin/sliders', icon: Layers },
    { label: 'Popup Yönetimi', href: '/admin/popups', icon: MessageSquare },
];

export function DashboardContent() {
    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
                <div className="absolute top-0 end-0 w-64 h-64 bg-gold/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 start-0 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <Badge className="bg-gold/20 text-gold border-gold/30 mb-4">
                        <Sparkles className="h-3 w-3 me-1" />
                        Admin Panel
                    </Badge>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Hoş Geldiniz 👋
                    </h1>
                    <p className="text-white/60 max-w-lg">
                        AVM platformunuzu buradan yönetin.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Link key={stat.title} href={stat.href}>
                        <Card className="group hover:shadow-lg transition-all cursor-pointer h-full border-border/50">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                                        <stat.icon className="h-6 w-6 text-white" />
                                    </div>
                                    <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-3xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.title}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity */}
                <Card className="lg:col-span-2 border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-gold" />
                            Son Aktiviteler
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                                <div className="w-2 h-2 rounded-full bg-gold" />
                                <div className="flex-1">
                                    <p className="text-sm">Zara mağazası güncellendi</p>
                                    <p className="text-xs text-muted-foreground">5 dk önce</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <div className="flex-1">
                                    <p className="text-sm">Yeni etkinlik eklendi</p>
                                    <p className="text-xs text-muted-foreground">1 saat önce</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <div className="flex-1">
                                    <p className="text-sm">Slider sıralaması değişti</p>
                                    <p className="text-xs text-muted-foreground">2 saat önce</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/30">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <div className="flex-1">
                                    <p className="text-sm">Popup aktif edildi</p>
                                    <p className="text-xs text-muted-foreground">3 saat önce</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-gold" />
                            Hızlı Erişim
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {quickActions.map((action) => (
                            <Link key={action.label} href={action.href}>
                                <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-gold/50 hover:bg-gold/5 transition-all cursor-pointer group">
                                    <action.icon className="h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                                    <span className="text-sm font-medium flex-1">{action.label}</span>
                                    <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border/50">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-violet-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">%98.2</p>
                            <p className="text-sm text-muted-foreground">Uptime</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                            <Users className="h-6 w-6 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">12.4K</p>
                            <p className="text-sm text-muted-foreground">Bu Ay Ziyaretçi</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-border/50">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Eye className="h-6 w-6 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">45.2K</p>
                            <p className="text-sm text-muted-foreground">Sayfa Görüntüleme</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
