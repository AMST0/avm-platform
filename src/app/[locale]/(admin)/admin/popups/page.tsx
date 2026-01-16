"use client";

import { useState, useEffect } from 'react';
import { PopupManager } from '@/components/admin/popup-manager';
import type { Popup } from '@/lib/types';
import { PopupFormData } from '@/lib/schemas';
import { toast } from 'sonner';

export default function AdminPopupsPage() {
    const [popups, setPopups] = useState<Popup[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPopups();
    }, []);

    const fetchPopups = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/popups');
            const result = await response.json();
            if (result.success) {
                setPopups(result.data);
            } else {
                toast.error('Popup\'lar yüklenirken hata oluştu');
            }
        } catch (error) {
            console.error('Failed to fetch popups:', error);
            toast.error('Popup\'lar yüklenirken hata oluştu');
        }
        setIsLoading(false);
    };

    const handleAdd = async (data: PopupFormData) => {
        const response = await fetch('/api/admin/popups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to create popup');

        const result = await response.json();
        if (result.success) {
            setPopups((prev) => [result.data, ...prev]);
        }
    };

    const handleEdit = async (id: string, data: PopupFormData) => {
        const response = await fetch(`/api/admin/popups?id=${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Failed to update popup');

        const result = await response.json();
        if (result.success) {
            setPopups((prev) =>
                prev.map((p) => (p.id === id ? result.data : p))
            );
        }
    };

    const handleDelete = async (id: string) => {
        const response = await fetch(`/api/admin/popups?id=${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete popup');

        setPopups((prev) => prev.filter((p) => p.id !== id));
    };

    const handleToggleActive = async (id: string, isActive: boolean) => {
        const response = await fetch(`/api/admin/popups?id=${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isActive }),
        });

        if (response.ok) {
            setPopups((prev) =>
                prev.map((p) => (p.id === id ? { ...p, isActive } : p))
            );
            toast.success(isActive ? 'Popup aktif edildi' : 'Popup pasif edildi');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-muted-foreground">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <PopupManager
            popups={popups}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
        />
    );
}
