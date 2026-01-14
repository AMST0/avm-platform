"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
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
    Zap,
    Activity,
    BarChart3,
    Target,
    Medal,
    Flame
} from 'lucide-react';

import { useEffect, useState } from 'react';

const MotionCard = motion.create(Card);
const MotionDiv = motion.div;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

interface OverviewClientProps {
    data: {
        shopCount: number;
        eventCount: number;
        sliderCount: number;
        popupCount: number;
        inquiryCount: number;
        activities: any[];
    }
}

const iconMap: any = {
    Store,
    Calendar,
    Layers,
    MessageSquare,
};

export function OverviewClient({ data }: OverviewClientProps) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeString = currentTime.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const dateString = currentTime.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const stats = [
        {
            title: 'Toplam Mağaza',
            value: data.shopCount,
            change: '+3 bu hafta',
            icon: Store,
            gradient: 'from-violet-600 via-purple-600 to-indigo-600',
            bgGlow: 'violet-500',
            href: '/admin/shops',
        },
        {
            title: 'Yaklaşan Etkinlik',
            value: data.eventCount,
            change: '+2 yeni',
            icon: Calendar,
            gradient: 'from-amber-500 via-orange-500 to-red-500',
            bgGlow: 'amber-500',
            href: '/admin/events',
        },
        {
            title: 'Aktif Slider',
            value: data.sliderCount,
            change: 'Tümü yayında',
            icon: Layers,
            gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
            bgGlow: 'cyan-500',
            href: '/admin/sliders',
        },
        {
            title: 'Aktif Popup',
            value: data.popupCount,
            change: '1 beklemede',
            icon: MessageSquare,
            gradient: 'from-emerald-500 via-green-500 to-teal-500',
            bgGlow: 'emerald-500',
            href: '/admin/popups',
        },
    ];

    const quickActions = [
        { label: 'Mağaza Yönetimi', href: '/admin/shops', icon: Store, color: 'text-violet-500', bg: 'bg-violet-500/10' },
        { label: 'Etkinlik Yönetimi', href: '/admin/events', icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { label: 'Slider Yönetimi', href: '/admin/sliders', icon: Layers, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
        { label: 'Popup Yönetimi', href: '/admin/popups', icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    return (
        <MotionDiv
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Premium Welcome Header */}
            <MotionDiv variants={itemVariants} className="relative">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 lg:p-10 border border-white/5">
                    {/* Animated Background Effects */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-gradient-to-br from-gold/20 via-amber-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-0 start-0 w-96 h-96 bg-gradient-to-tr from-violet-600/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
                        <div className="absolute top-1/2 start-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl" />
                    </div>

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-gradient-to-r from-gold/20 to-amber-500/20 text-gold border-gold/30 backdrop-blur-md px-4 py-1.5">
                                    <Sparkles className="h-3.5 w-3.5 me-1.5" />
                                    Admin Panel
                                </Badge>
                                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 backdrop-blur-md">
                                    <Activity className="h-3 w-3 me-1.5" />
                                    Sistem Aktif
                                </Badge>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
                                Hoş Geldiniz 👋
                            </h1>
                            <p className="text-white/50 max-w-lg text-lg">
                                AVM platformunuz kontrol altında. Mağazalar, etkinlikler ve kampanyaları buradan yönetin.
                            </p>
                        </div>

                        {/* Mini Stats - Live Clock */}
                        <div className="flex items-center gap-4">
                            <div className="px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 min-w-[220px] flex flex-col items-center justify-center">
                                <div className="flex items-center gap-2 mb-1">
                                    <Clock className="h-4 w-4 text-gold animate-pulse" />
                                    <span className="text-xs text-white/50">{dateString}</span>
                                </div>
                                <p className="text-4xl font-bold text-white tracking-widest">{timeString}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MotionDiv>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, index) => (
                    <MotionDiv key={stat.title} variants={itemVariants}>
                        <Link href={stat.href}>
                            <MotionCard
                                className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 cursor-pointer h-full"
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {/* Glow Effect */}
                                <div className={`absolute -top-20 -end-20 w-40 h-40 bg-${stat.bgGlow}/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                {/* Gradient Border on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                <CardContent className="p-6 relative">
                                    <div className="flex items-start justify-between mb-5">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg shadow-${stat.bgGlow}/25`}>
                                            <stat.icon className="h-7 w-7 text-white" />
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-4xl font-bold tracking-tight">{stat.value}</p>
                                        <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                                    </div>
                                </CardContent>
                            </MotionCard>
                        </Link>
                    </MotionDiv>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Feed - 2 columns */}
                <MotionDiv variants={itemVariants} className="lg:col-span-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center shadow-lg shadow-gold/25">
                                        <Clock className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <span className="block">Son Aktiviteler</span>
                                        <span className="text-xs text-muted-foreground font-normal">Gerçek zamanlı güncellemeler</span>
                                    </div>
                                </CardTitle>
                                <Badge variant="outline" className="text-xs animate-pulse">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 me-2" />
                                    Canlı
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {data.activities.length === 0 ? (
                                <p className="text-center py-8 text-muted-foreground">Henüz yeni aktivite yok.</p>
                            ) : data.activities.map((activity, index) => {
                                const Icon = iconMap[activity.icon] || Store;
                                return (
                                    <MotionDiv
                                        key={index}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 hover:bg-accent/50 transition-all duration-300 group border border-transparent hover:border-border/50"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activity.type === 'create'
                                            ? 'bg-emerald-500/10 text-emerald-500'
                                            : 'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{activity.text}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                        <Badge variant="outline" className={`text-xs shrink-0 ${activity.type === 'create'
                                            ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10'
                                            : 'border-blue-500/30 text-blue-500 bg-blue-500/10'
                                            }`}>
                                            {activity.type === 'create' ? 'Yeni' : 'Güncelleme'}
                                        </Badge>
                                    </MotionDiv>
                                )
                            })}
                        </CardContent>
                    </Card>
                </MotionDiv>

                {/* Quick Actions */}
                <MotionDiv variants={itemVariants}>
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                                    <Zap className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <span className="block">Hızlı Erişim</span>
                                    <span className="text-xs text-muted-foreground font-normal">Yönetim panelleri</span>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {quickActions.map((action, index) => (
                                <Link key={action.label} href={action.href}>
                                    <MotionDiv
                                        className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-gold/50 hover:bg-gold/5 transition-all duration-300 cursor-pointer group"
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                            <action.icon className={`h-5 w-5 ${action.color}`} />
                                        </div>
                                        <span className="text-sm font-medium flex-1">{action.label}</span>
                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </MotionDiv>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </MotionDiv>
            </div>

            {/* Bottom Metrics - Premium Design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <MotionDiv variants={itemVariants}>
                    <Card className="border-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent overflow-hidden relative group">
                        <div className="absolute top-0 end-0 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                        <CardContent className="p-6 flex items-center gap-5 relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl shadow-violet-500/30">
                                <BarChart3 className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold tracking-tight">%98.2</p>
                                <p className="text-sm text-muted-foreground">Uptime</p>
                                <p className="text-xs text-emerald-500 mt-1">↑ 0.3% bu hafta</p>
                            </div>
                        </CardContent>
                    </Card>
                </MotionDiv>

                <MotionDiv variants={itemVariants}>
                    <Card className="border-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent overflow-hidden relative group">
                        <div className="absolute top-0 end-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                        <CardContent className="p-6 flex items-center gap-5 relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl shadow-amber-500/30">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold tracking-tight">12.4K</p>
                                <p className="text-sm text-muted-foreground">Bu Ay Ziyaretçi</p>
                                <p className="text-xs text-emerald-500 mt-1">↑ 18% geçen aya göre</p>
                            </div>
                        </CardContent>
                    </Card>
                </MotionDiv>

                <MotionDiv variants={itemVariants}>
                    <Card className="border-0 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent overflow-hidden relative group">
                        <div className="absolute top-0 end-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                        <CardContent className="p-6 flex items-center gap-5 relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                                <Eye className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold tracking-tight">45.2K</p>
                                <p className="text-sm text-muted-foreground">Sayfa Görüntüleme</p>
                                <p className="text-xs text-emerald-500 mt-1">↑ 23% geçen aya göre</p>
                            </div>
                        </CardContent>
                    </Card>
                </MotionDiv>
            </div>
        </MotionDiv>
    );
}
