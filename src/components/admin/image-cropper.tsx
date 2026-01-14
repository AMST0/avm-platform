"use client";

import { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useTranslations } from 'next-intl';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ZoomIn, ZoomOut, RotateCw, Check, X } from 'lucide-react';

export type AspectRatio = '1:1' | '16:9' | '21:9';

interface ImageCropperProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    imageSrc: string;
    aspectRatio: AspectRatio;
    onCropComplete: (croppedImageUrl: string) => void;
}

const aspectRatioValues: Record<AspectRatio, number> = {
    '1:1': 1,
    '16:9': 16 / 9,
    '21:9': 21 / 9,
};

/**
 * Get the cropped image from canvas
 */
async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area
): Promise<string> {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => {
        image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('No 2d context');
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(URL.createObjectURL(blob));
            }
        }, 'image/jpeg', 0.95);
    });
}

export function ImageCropper({
    open,
    onOpenChange,
    imageSrc,
    aspectRatio,
    onCropComplete,
}: ImageCropperProps) {
    const t = useTranslations('admin.imageCropper');

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropChange = useCallback((location: { x: number; y: number }) => {
        setCrop(location);
    }, []);

    const onZoomChange = useCallback((value: number) => {
        setZoom(value);
    }, []);

    const onRotationChange = useCallback((value: number) => {
        setRotation(value);
    }, []);

    const onCropCompleteCallback = useCallback(
        (_croppedArea: Area, croppedAreaPixels: Area) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    const handleSave = useCallback(async () => {
        if (!croppedAreaPixels) return;

        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            onCropComplete(croppedImage);
            onOpenChange(false);

            // Reset state
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setRotation(0);
        } catch (error) {
            console.error('Error cropping image:', error);
        }
    }, [croppedAreaPixels, imageSrc, onCropComplete, onOpenChange]);

    const handleCancel = useCallback(() => {
        onOpenChange(false);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
    }, [onOpenChange]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                    <DialogDescription>
                        {aspectRatio === '1:1' ? t('logoHint') : aspectRatio === '21:9' ? 'Geniş banner için ideal oran (21:9)' : t('bannerHint')}
                    </DialogDescription>
                </DialogHeader>

                {/* Cropper Area */}
                <div className="relative h-[300px] bg-black rounded-lg overflow-hidden">
                    {imageSrc && (
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={aspectRatioValues[aspectRatio]}
                            onCropChange={onCropChange}
                            onZoomChange={onZoomChange}
                            onRotationChange={onRotationChange}
                            onCropComplete={onCropCompleteCallback}
                            cropShape="rect"
                            showGrid
                        />
                    )}
                </div>

                {/* Controls */}
                <div className="space-y-4">
                    {/* Zoom Control */}
                    <div className="flex items-center gap-4">
                        <Label className="w-16 text-sm">Zoom</Label>
                        <ZoomOut className="h-4 w-4 text-muted-foreground" />
                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={([value]) => setZoom(value)}
                            className="flex-1"
                        />
                        <ZoomIn className="h-4 w-4 text-muted-foreground" />
                    </div>

                    {/* Rotation Control */}
                    <div className="flex items-center gap-4">
                        <Label className="w-16 text-sm">Döndür</Label>
                        <RotateCw className="h-4 w-4 text-muted-foreground" />
                        <Slider
                            value={[rotation]}
                            min={0}
                            max={360}
                            step={1}
                            onValueChange={([value]) => setRotation(value)}
                            className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground w-10">{rotation}°</span>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleCancel}>
                        <X className="h-4 w-4 me-2" />
                        İptal
                    </Button>
                    <Button onClick={handleSave} className="bg-gold hover:bg-gold-light text-black">
                        <Check className="h-4 w-4 me-2" />
                        {t('crop')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
