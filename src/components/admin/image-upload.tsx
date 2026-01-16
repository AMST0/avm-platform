'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ImageCropper, type AspectRatio } from './image-cropper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useUploadThing } from '@/lib/utils/uploadthing';
import { toast } from 'sonner';

interface ImageUploadWithCropProps {
    value?: string;
    onChange: (value: string) => void;
    aspectRatio?: AspectRatio;
    label: string;
    hint?: string;
    disabled?: boolean;
    error?: string;
    fileName?: string;
}

export function ImageUploadWithCrop({
    value,
    onChange,
    aspectRatio = '16:9',
    label,
    hint,
    disabled,
    error,
    fileName,
}: ImageUploadWithCropProps) {
    const t = useTranslations('admin.imageCropper');
    const inputRef = useRef<HTMLInputElement>(null);

    const [cropperOpen, setCropperOpen] = useState(false);
    const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const { startUpload } = useUploadThing("imageUploader", {
        onClientUploadComplete: (res) => {
            if (res && res[0]) {
                onChange(res[0].ufsUrl || res[0].url);
                toast.success("Resim başarıyla yüklendi");
            }
            setIsUploading(false);
        },
        onUploadError: (error: Error) => {
            toast.error(`Yükleme hatası: ${error.message}`);
            setIsUploading(false);
        },
    });

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Lütfen bir görsel dosyası seçin.');
            return;
        }

        // Validate file size (max 4MB for UploadThing free tier mostly, keeping 10MB check looser locally but core.ts has 4MB)
        const maxSize = 4 * 1024 * 1024; // 4MB
        if (file.size > maxSize) {
            toast.error('Dosya boyutu 4MB\'dan büyük olamaz.');
            return;
        }

        // Create object URL for cropping
        const objectUrl = URL.createObjectURL(file);
        setTempImageSrc(objectUrl);
        setCropperOpen(true);

        // Reset input
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, []);

    // Helper to convert dataURL/Blob URL to File
    const getFileFromUrl = async (url: string, fileName: string): Promise<File> => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], fileName, { type: blob.type });
    };

    const handleCropComplete = useCallback(async (croppedImageUrl: string) => {
        // Clean up temp image
        if (tempImageSrc) {
            URL.revokeObjectURL(tempImageSrc);
            setTempImageSrc(null);
        }

        // Start Upload Process
        setIsUploading(true);
        try {
            // croppedImageUrl is likely a blob URL or base64. 
            // We need to convert it to a File object for UploadThing.
            const name = fileName || "upload.png";
            const file = await getFileFromUrl(croppedImageUrl, name);

            await startUpload([file]);
        } catch (error) {
            if (process.env.NODE_ENV === 'development') console.error(error);
            toast.error("Dosya hazırlanırken bir hata oluştu");
            setIsUploading(false);
        }
    }, [startUpload, tempImageSrc]);

    const handleRemove = useCallback(() => {
        onChange('');
    }, [onChange]);

    const handleCropperClose = useCallback((open: boolean) => {
        if (!open && tempImageSrc) {
            URL.revokeObjectURL(tempImageSrc);
            setTempImageSrc(null);
        }
        setCropperOpen(open);
    }, [tempImageSrc]);

    return (
        <div className="space-y-2">
            <Label className={cn(error && 'text-destructive')}>{label}</Label>
            {hint && <p className="text-xs text-muted-foreground">{hint}</p>}

            {value ? (
                // Preview
                <div className="relative group">
                    <div
                        className={cn(
                            'relative overflow-hidden rounded-lg border border-border bg-muted',
                            aspectRatio === '1:1' ? 'w-32 h-32' : 'w-full h-40'
                        )}
                    >
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                onClick={() => inputRef.current?.click()}
                                disabled={disabled || isUploading}
                            >
                                <Upload className="h-4 w-4 me-1" />
                                Değiştir
                            </Button>
                            <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={handleRemove}
                                disabled={disabled || isUploading}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                // Upload Button
                <div
                    onClick={() => !disabled && !isUploading && inputRef.current?.click()}
                    className={cn(
                        'relative overflow-hidden rounded-lg border-2 border-dashed transition-colors cursor-pointer',
                        aspectRatio === '1:1' ? 'w-32 h-32' : 'w-full h-40',
                        (disabled || isUploading)
                            ? 'border-muted bg-muted cursor-not-allowed'
                            : 'border-border hover:border-gold bg-muted/50 hover:bg-muted',
                        error && 'border-destructive'
                    )}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        {isUploading ? (
                            <>
                                <Loader2 className="h-8 w-8 text-gold animate-spin" />
                                <span className="text-xs font-medium text-gold">Yükleniyor...</span>
                            </>
                        ) : (
                            <>
                                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                                    <ImageIcon className="h-5 w-5 text-gold" />
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {aspectRatio === '1:1' ? '1:1 Oran' : aspectRatio === '21:9' ? '21:9 Oran' : aspectRatio === 'free' ? 'Serbest Oran' : '16:9 Oran'}
                                </span>
                                <span className="text-xs font-medium text-gold">Görsel Yükle</span>
                            </>
                        )}
                    </div>
                </div>
            )}

            {error && <p className="text-xs text-destructive">{error}</p>}

            {/* Hidden Input */}
            <Input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={disabled || isUploading}
                className="hidden"
            />

            {/* Cropper Dialog */}
            {tempImageSrc && (
                <ImageCropper
                    open={cropperOpen}
                    onOpenChange={handleCropperClose}
                    imageSrc={tempImageSrc}
                    aspectRatio={aspectRatio}
                    onCropComplete={handleCropComplete}
                />
            )}
        </div>
    );
}
