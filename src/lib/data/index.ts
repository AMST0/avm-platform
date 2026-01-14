// ==========================================
// AVM Platform - Data Layer Public API
// ==========================================

// Re-export all repository functions
export * from './repositories/shop.repository';
export * from './repositories/event.repository';
export * from './repositories/slider.repository';
export * from './repositories/popup.repository';

// Re-export mock data for admin seeding
export { mockShops } from './mock/shops';
export { mockEvents } from './mock/events';
export { mockSliders } from './mock/sliders';
export { mockPopups } from './mock/popups';
