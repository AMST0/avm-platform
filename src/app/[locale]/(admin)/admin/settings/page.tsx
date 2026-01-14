"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Settings,
    Globe,
    Palette,
    Bell,
    Shield,
    Save,
    Building2
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
    const [generalSettings, setGeneralSettings] = useState({
        siteName: 'AVM Platform',
        siteDescription: 'Premium Alışveriş Merkezi Deneyimi',
        contactEmail: 'info@avmplatform.com',
        contactPhone: '+90 212 123 45 67',
        address: 'Atatürk Bulvarı No: 123, İstanbul',
        workingHours: '10:00 - 22:00',
    });

    const [appearanceSettings, setAppearanceSettings] = useState({
        theme: 'system',
        primaryColor: 'navy',
        accentColor: 'gold',
        enableAnimations: true,
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        newShopNotifications: true,
        eventReminders: true,
        maintenanceAlerts: true,
    });

    const handleSaveGeneral = () => {
        toast.success('Genel ayarlar kaydedildi');
    };

    const handleSaveAppearance = () => {
        toast.success('Görünüm ayarları kaydedildi');
    };

    const handleSaveNotifications = () => {
        toast.success('Bildirim ayarları kaydedildi');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Ayarlar</h1>
                <p className="text-muted-foreground">
                    Platform ayarlarını yönetin
                </p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full max-w-lg grid-cols-4">
                    <TabsTrigger value="general" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span className="hidden sm:inline">Genel</span>
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        <span className="hidden sm:inline">Görünüm</span>
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="hidden sm:inline">Bildirimler</span>
                    </TabsTrigger>
                    <TabsTrigger value="seo" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span className="hidden sm:inline">SEO</span>
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                Genel Ayarlar
                            </CardTitle>
                            <CardDescription>
                                AVM platformunun temel bilgilerini düzenleyin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Site Adı</Label>
                                    <Input
                                        value={generalSettings.siteName}
                                        onChange={(e) =>
                                            setGeneralSettings((prev) => ({ ...prev, siteName: e.target.value }))
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>İletişim E-posta</Label>
                                    <Input
                                        type="email"
                                        value={generalSettings.contactEmail}
                                        onChange={(e) =>
                                            setGeneralSettings((prev) => ({ ...prev, contactEmail: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Site Açıklaması</Label>
                                <Textarea
                                    value={generalSettings.siteDescription}
                                    onChange={(e) =>
                                        setGeneralSettings((prev) => ({ ...prev, siteDescription: e.target.value }))
                                    }
                                    rows={2}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Telefon</Label>
                                    <Input
                                        value={generalSettings.contactPhone}
                                        onChange={(e) =>
                                            setGeneralSettings((prev) => ({ ...prev, contactPhone: e.target.value }))
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Çalışma Saatleri</Label>
                                    <Input
                                        value={generalSettings.workingHours}
                                        onChange={(e) =>
                                            setGeneralSettings((prev) => ({ ...prev, workingHours: e.target.value }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Adres</Label>
                                <Textarea
                                    value={generalSettings.address}
                                    onChange={(e) =>
                                        setGeneralSettings((prev) => ({ ...prev, address: e.target.value }))
                                    }
                                    rows={2}
                                />
                            </div>

                            <Separator />

                            <Button onClick={handleSaveGeneral} className="bg-gold hover:bg-gold-light text-black">
                                <Save className="h-4 w-4 me-2" />
                                Kaydet
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Appearance Settings */}
                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Palette className="h-5 w-5" />
                                Görünüm Ayarları
                            </CardTitle>
                            <CardDescription>
                                Platformun görsel ayarlarını özelleştirin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Tema</Label>
                                    <Select
                                        value={appearanceSettings.theme}
                                        onValueChange={(value) =>
                                            setAppearanceSettings((prev) => ({ ...prev, theme: value }))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Açık</SelectItem>
                                            <SelectItem value="dark">Koyu</SelectItem>
                                            <SelectItem value="system">Sistem</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Ana Renk</Label>
                                    <Select
                                        value={appearanceSettings.primaryColor}
                                        onValueChange={(value) =>
                                            setAppearanceSettings((prev) => ({ ...prev, primaryColor: value }))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="navy">Navy Blue</SelectItem>
                                            <SelectItem value="blue">Blue</SelectItem>
                                            <SelectItem value="purple">Purple</SelectItem>
                                            <SelectItem value="green">Green</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Animasyonlar</p>
                                    <p className="text-sm text-muted-foreground">
                                        Sayfa geçişlerinde animasyon kullan
                                    </p>
                                </div>
                                <Switch
                                    checked={appearanceSettings.enableAnimations}
                                    onCheckedChange={(checked) =>
                                        setAppearanceSettings((prev) => ({ ...prev, enableAnimations: checked }))
                                    }
                                />
                            </div>

                            <Separator />

                            <Button onClick={handleSaveAppearance} className="bg-gold hover:bg-gold-light text-black">
                                <Save className="h-4 w-4 me-2" />
                                Kaydet
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Bildirim Ayarları
                            </CardTitle>
                            <CardDescription>
                                Hangi bildirimleri almak istediğinizi seçin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">E-posta Bildirimleri</p>
                                        <p className="text-sm text-muted-foreground">
                                            Önemli güncellemeler için e-posta al
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.emailNotifications}
                                        onCheckedChange={(checked) =>
                                            setNotificationSettings((prev) => ({ ...prev, emailNotifications: checked }))
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Yeni Mağaza Bildirimleri</p>
                                        <p className="text-sm text-muted-foreground">
                                            Yeni mağaza eklendiğinde bildirim al
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.newShopNotifications}
                                        onCheckedChange={(checked) =>
                                            setNotificationSettings((prev) => ({ ...prev, newShopNotifications: checked }))
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Etkinlik Hatırlatıcıları</p>
                                        <p className="text-sm text-muted-foreground">
                                            Yaklaşan etkinlikler için hatırlatma al
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.eventReminders}
                                        onCheckedChange={(checked) =>
                                            setNotificationSettings((prev) => ({ ...prev, eventReminders: checked }))
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium">Bakım Uyarıları</p>
                                        <p className="text-sm text-muted-foreground">
                                            Sistem bakımı için uyarı al
                                        </p>
                                    </div>
                                    <Switch
                                        checked={notificationSettings.maintenanceAlerts}
                                        onCheckedChange={(checked) =>
                                            setNotificationSettings((prev) => ({ ...prev, maintenanceAlerts: checked }))
                                        }
                                    />
                                </div>
                            </div>

                            <Separator />

                            <Button onClick={handleSaveNotifications} className="bg-gold hover:bg-gold-light text-black">
                                <Save className="h-4 w-4 me-2" />
                                Kaydet
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SEO Settings */}
                <TabsContent value="seo">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                SEO Ayarları
                            </CardTitle>
                            <CardDescription>
                                Arama motoru optimizasyonu ayarlarını yönetin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 rounded-lg bg-gold/10 border border-gold/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="h-5 w-5 text-gold" />
                                    <p className="font-medium text-gold">SEO Politikası</p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Bu platformda tüm mağaza ve etkinlikler için SEO alanları (Meta Title, Meta
                                    Description) <strong>zorunludur</strong>. Bu politika, içerik kalitesini ve
                                    arama motoru görünürlüğünü artırmak için uygulanmaktadır.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Varsayılan Meta Title Formatı</Label>
                                    <Input
                                        value="{sayfa_adi} | AVM Platform"
                                        disabled
                                        className="bg-muted"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Sayfa başlıkları bu formatta oluşturulur
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Robots.txt</Label>
                                    <Textarea
                                        value={`User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: https://avmplatform.com/sitemap.xml`}
                                        rows={5}
                                        className="font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <Separator />

                            <Button className="bg-gold hover:bg-gold-light text-black">
                                <Save className="h-4 w-4 me-2" />
                                Kaydet
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
