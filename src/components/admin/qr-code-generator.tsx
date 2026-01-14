"use client";

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ExternalLink, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeGeneratorProps {
    url: string;
    shopName: string;
    size?: number;
}

export function QRCodeGenerator({ url, shopName, size = 200 }: QRCodeGeneratorProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (canvasRef.current && url) {
            QRCode.toCanvas(canvasRef.current, url, {
                width: size,
                margin: 2,
                color: {
                    dark: '#1e3a8a', // Navy
                    light: '#ffffff',
                },
            });
        }
    }, [url, size]);

    const handleDownload = () => {
        if (!canvasRef.current) return;

        const link = document.createElement('a');
        link.download = `${shopName.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
        link.href = canvasRef.current.toDataURL('image/png');
        link.click();

        toast.success('QR kod indirildi!');
    };

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast.success('URL kopyalandı!');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('URL kopyalanamadı');
        }
    };

    if (!url) {
        return (
            <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Mağaza kaydedildikten sonra QR kod oluşturulacaktır.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent className="p-6 space-y-4">
                {/* QR Code Canvas */}
                <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-lg border">
                        <canvas ref={canvasRef} />
                    </div>
                </div>

                {/* URL Display */}
                <div className="bg-muted rounded-lg p-3 flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground truncate flex-1">{url}</span>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-8 w-8"
                        onClick={handleCopyUrl}
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={handleDownload}
                    >
                        <Download className="h-4 w-4 me-2" />
                        İndir
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                    >
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 me-2" />
                            Önizle
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
