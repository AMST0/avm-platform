"use client";

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { getActivePopup } from '@/lib/data';
import { useUserPreferencesStore } from '@/lib/store';
import type { Popup, Locale } from '@/lib/types';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function PopupDisplay() {
    const locale = useLocale() as Locale;
    const [popup, setPopup] = useState<Popup | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { hasSeenPopupById, markPopupAsSeen } = useUserPreferencesStore();

    useEffect(() => {
        const fetchPopup = async () => {
            const activePopup = await getActivePopup();

            if (activePopup) {
                // Check if user has already seen this popup (for frequency: 'once')
                if (activePopup.frequency === 'once' && hasSeenPopupById(activePopup.id)) {
                    return;
                }

                setPopup(activePopup);
                // Slight delay for better UX
                setTimeout(() => setIsOpen(true), 1500);
            }
        };

        fetchPopup();
    }, [hasSeenPopupById]);

    const handleClose = () => {
        setIsOpen(false);
        if (popup && popup.frequency === 'once') {
            markPopupAsSeen(popup.id);
        }
    };

    if (!popup) return null;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-navy/20">
                {/* Popup Content */}
                {popup.link ? (
                    <a
                        href={popup.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleClose}
                        className="block"
                    >
                        <img
                            src={popup.image}
                            alt={popup.title[locale]}
                            className="w-full h-auto"
                        />
                    </a>
                ) : (
                    <img
                        src={popup.image}
                        alt={popup.title[locale]}
                        className="w-full h-auto"
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
