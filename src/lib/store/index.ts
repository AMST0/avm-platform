// ==========================================
// AVM Platform - Zustand Global Store
// ==========================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '@/i18n/routing';
import type { Shop, ShopCategory } from '@/lib/types';

// ==========================================
// Filter Store (Shop Filters)
// ==========================================
interface FilterState {
    category: ShopCategory | null;
    floor: number | null;
    search: string;
    setCategory: (category: ShopCategory | null) => void;
    setFloor: (floor: number | null) => void;
    setSearch: (search: string) => void;
    resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    category: null,
    floor: null,
    search: '',
    setCategory: (category) => set({ category }),
    setFloor: (floor) => set({ floor }),
    setSearch: (search) => set({ search }),
    resetFilters: () => set({ category: null, floor: null, search: '' }),
}));

// ==========================================
// User Preferences Store
// ==========================================
interface UserPreferencesState {
    theme: 'light' | 'dark' | 'system';
    hasSeenPopup: Record<string, boolean>;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    markPopupAsSeen: (popupId: string) => void;
    hasSeenPopupById: (popupId: string) => boolean;
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
    persist(
        (set, get) => ({
            theme: 'system',
            hasSeenPopup: {},
            setTheme: (theme) => set({ theme }),
            markPopupAsSeen: (popupId) =>
                set((state) => ({
                    hasSeenPopup: { ...state.hasSeenPopup, [popupId]: true },
                })),
            hasSeenPopupById: (popupId) => get().hasSeenPopup[popupId] || false,
        }),
        {
            name: 'avm-user-preferences',
        }
    )
);

// ==========================================
// Spotlight Search Store (Cmd+K)
// ==========================================
interface SpotlightState {
    isOpen: boolean;
    query: string;
    open: () => void;
    close: () => void;
    toggle: () => void;
    setQuery: (query: string) => void;
}

export const useSpotlightStore = create<SpotlightState>((set) => ({
    isOpen: false,
    query: '',
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false, query: '' }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
    setQuery: (query) => set({ query }),
}));

// ==========================================
// Admin Sidebar Store
// ==========================================
interface AdminSidebarState {
    isCollapsed: boolean;
    toggle: () => void;
    setCollapsed: (collapsed: boolean) => void;
}

export const useAdminSidebarStore = create<AdminSidebarState>((set) => ({
    isCollapsed: false,
    toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
}));

// ==========================================
// Slider Order Store (Persist drag-drop order)
// ==========================================
interface SliderOrderState {
    orderedIds: string[];
    setOrderedIds: (ids: string[]) => void;
    getOrderedSliders: <T extends { id: string }>(sliders: T[]) => T[];
}

export const useSliderOrderStore = create<SliderOrderState>()(
    persist(
        (set, get) => ({
            orderedIds: [],
            setOrderedIds: (ids) => set({ orderedIds: ids }),
            getOrderedSliders: <T extends { id: string }>(sliders: T[]): T[] => {
                const { orderedIds } = get();
                if (orderedIds.length === 0) return sliders;

                // Sort sliders based on stored order
                const orderMap = new Map(orderedIds.map((id, index) => [id, index]));
                return [...sliders].sort((a, b) => {
                    const orderA = orderMap.get(a.id) ?? Infinity;
                    const orderB = orderMap.get(b.id) ?? Infinity;
                    return orderA - orderB;
                });
            },
        }),
        {
            name: 'avm-slider-order',
        }
    )
);
// ==========================================
// Shop Popup Store (Global Popup)
// ==========================================
interface ShopPopupState {
    shop: Shop | null;
    isOpen: boolean;
    open: (shop: Shop) => void;
    close: () => void;
}

export const useShopPopupStore = create<ShopPopupState>((set) => ({
    shop: null,
    isOpen: false,
    open: (shop) => set({ shop, isOpen: true }),
    close: () => set({ shop: null, isOpen: false }),
}));
