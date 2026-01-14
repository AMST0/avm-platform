// ==========================================
// AVM Platform - Core TypeScript Types
// ==========================================

export type Locale = 'tr' | 'en' | 'ru' | 'ar';

export type LocalizedString = Record<Locale, string>;

// Shop Categories
export type ShopCategory =
  | 'fashion'
  | 'electronics'
  | 'food'
  | 'entertainment'
  | 'health'
  | 'home'
  | 'jewelry'
  | 'sports'
  | 'cosmetics'
  | 'services';

// ==========================================
// Shop Interface
// ==========================================
export interface Shop {
  id: string;
  name: string;
  slug: string;
  category: ShopCategory;
  floor: number;
  logo: string;
  banner?: string;
  description: LocalizedString;
  workingHours?: string;
  phone?: string;
  website?: string;
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// Event Interface
// ==========================================  
export interface Event {
  id: string;
  title: LocalizedString;
  slug: string;
  description: LocalizedString;
  image: string;
  startDate: Date;
  endDate: Date;
  location: string;
  seo: {
    metaTitle: LocalizedString;
    metaDescription: LocalizedString;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// Slider Interface
// ==========================================
export interface Slider {
  id: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  image: string;
  mobileImage?: string;
  link?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// Popup Interface
// ==========================================
export interface Popup {
  id: string;
  title: LocalizedString;
  image: string;
  link?: string;
  frequency: 'once' | 'always';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ==========================================
// Category Labels (for i18n)
// ==========================================
export const CATEGORY_LABELS: Record<ShopCategory, LocalizedString> = {
  fashion: { tr: 'Moda', en: 'Fashion', ru: 'Мода', ar: 'أزياء' },
  electronics: { tr: 'Elektronik', en: 'Electronics', ru: 'Электроника', ar: 'إلكترونيات' },
  food: { tr: 'Yeme & İçme', en: 'Food & Drink', ru: 'Еда и напитки', ar: 'طعام ومشروبات' },
  entertainment: { tr: 'Eğlence', en: 'Entertainment', ru: 'Развлечения', ar: 'ترفيه' },
  health: { tr: 'Sağlık', en: 'Health', ru: 'Здоровье', ar: 'صحة' },
  home: { tr: 'Ev & Yaşam', en: 'Home & Living', ru: 'Дом и жизнь', ar: 'المنزل والمعيشة' },
  jewelry: { tr: 'Mücevher', en: 'Jewelry', ru: 'Ювелирные изделия', ar: 'مجوهرات' },
  sports: { tr: 'Spor', en: 'Sports', ru: 'Спорт', ar: 'رياضة' },
  cosmetics: { tr: 'Kozmetik', en: 'Cosmetics', ru: 'Косметика', ar: 'مستحضرات تجميل' },
  services: { tr: 'Hizmetler', en: 'Services', ru: 'Услуги', ar: 'خدمات' },
};

// Floor Labels
export const FLOOR_LABELS: Record<number, LocalizedString> = {
  [-1]: { tr: 'Bodrum Kat', en: 'Basement', ru: 'Цокольный этаж', ar: 'الطابق السفلي' },
  0: { tr: 'Zemin Kat', en: 'Ground Floor', ru: 'Первый этаж', ar: 'الطابق الأرضي' },
  1: { tr: '1. Kat', en: '1st Floor', ru: '1-й этаж', ar: 'الطابق الأول' },
  2: { tr: '2. Kat', en: '2nd Floor', ru: '2-й этаж', ar: 'الطابق الثاني' },
  3: { tr: '3. Kat', en: '3rd Floor', ru: '3-й этаж', ar: 'الطابق الثالث' },
  4: { tr: '4. Kat', en: '4th Floor', ru: '4-й этаж', ar: 'الطابق الرابع' },
};

// ==========================================
// Input Types for Repositories
// ==========================================

export interface ShopInput {
  name: string;
  slug: string;
  category: ShopCategory;
  floor: number;
  logo: string;
  banner?: string;
  description: LocalizedString;
  workingHours?: string;
  phone?: string;
  website?: string;
  featured?: boolean;
  isActive?: boolean;
}

export interface ShopFilters {
  category?: ShopCategory;
  floor?: number;
  search?: string;
  featured?: boolean;
  isActive?: boolean;
}

export interface EventInput {
  title: LocalizedString;
  slug: string;
  description: LocalizedString;
  image: string;
  startDate: Date;
  endDate: Date;
  location: string;
  isActive?: boolean;
}

export interface SliderInput {
  title: LocalizedString;
  subtitle?: LocalizedString;
  image: string;
  mobileImage?: string;
  link?: string;
  order: number;
  isActive?: boolean;
}

export interface PopupInput {
  title: LocalizedString;
  image: string;
  link?: string;
  frequency: 'once' | 'always';
  isActive?: boolean;
}
