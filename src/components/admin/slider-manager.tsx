"use client";

import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useLocale } from 'next-intl';
import type { Slider, Locale } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { GripVertical, Pencil, Trash2, Plus, Image as ImageIcon, ExternalLink } from 'lucide-react';

interface SliderManagerProps {
    sliders: Slider[];
    onReorder: (orderedIds: string[]) => Promise<void>;
    onEdit: (slider: Slider) => void;
    onDelete: (id: string) => Promise<void>;
    onAdd: () => void;
    onToggleActive: (id: string, isActive: boolean) => Promise<void>;
}

interface SortableSliderItemProps {
    slider: Slider;
    locale: Locale;
    onEdit: () => void;
    onDelete: () => void;
    onToggleActive: (isActive: boolean) => void;
}

function SortableSliderItem({
    slider,
    locale,
    onEdit,
    onDelete,
    onToggleActive
}: SortableSliderItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: slider.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-4 p-4 bg-card border rounded-lg ${isDragging ? 'shadow-lg ring-2 ring-gold' : ''
                }`}
        >
            {/* Drag Handle */}
            <button
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded"
            >
                <GripVertical className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Image Preview */}
            <div className="w-24 h-14 rounded overflow-hidden bg-muted shrink-0">
                {slider.image ? (
                    <img
                        src={slider.image}
                        alt={slider.title[locale]}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{slider.title[locale]}</h4>
                    <Badge variant={slider.isActive ? 'default' : 'secondary'}>
                        {slider.isActive ? 'Aktif' : 'Pasif'}
                    </Badge>
                </div>
                {slider.subtitle?.[locale] && (
                    <p className="text-sm text-muted-foreground truncate">
                        {slider.subtitle[locale]}
                    </p>
                )}
                {slider.link && (
                    <div className="flex items-center gap-1 text-xs text-gold mt-1">
                        <ExternalLink className="h-3 w-3" />
                        <span className="truncate">{slider.link}</span>
                    </div>
                )}
            </div>

            {/* Order Badge */}
            <Badge variant="outline" className="shrink-0">
                #{slider.order + 1}
            </Badge>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
                <Switch
                    checked={slider.isActive}
                    onCheckedChange={onToggleActive}
                />
                <Button variant="ghost" size="icon" onClick={onEdit}>
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onDelete}
                    className="text-destructive hover:text-destructive"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

export function SliderManager({
    sliders,
    onReorder,
    onEdit,
    onDelete,
    onAdd,
    onToggleActive,
}: SliderManagerProps) {
    const locale = useLocale() as Locale;
    const [items, setItems] = useState(sliders);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);

            const newItems = arrayMove(items, oldIndex, newIndex);
            setItems(newItems);

            try {
                await onReorder(newItems.map((item) => item.id));
                toast.success('Sıralama güncellendi');
            } catch {
                // Revert on error
                setItems(items);
                toast.error('Sıralama güncellenemedi');
            }
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Slider Yönetimi</CardTitle>
                <Button onClick={onAdd} className="bg-gold hover:bg-gold-light text-black">
                    <Plus className="h-4 w-4 me-2" />
                    Yeni Slider
                </Button>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                    Sliderları sürükleyerek sıralayabilirsiniz.
                </p>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={items.map((item) => item.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="space-y-2">
                            {items.map((slider) => (
                                <SortableSliderItem
                                    key={slider.id}
                                    slider={slider}
                                    locale={locale}
                                    onEdit={() => onEdit(slider)}
                                    onDelete={() => onDelete(slider.id)}
                                    onToggleActive={(isActive) => onToggleActive(slider.id, isActive)}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                {items.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Henüz slider eklenmemiş.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
