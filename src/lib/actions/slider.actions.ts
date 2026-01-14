'use server';

import {
    getAllSliders,
    getSliderById,
    createSlider,
    updateSlider,
    deleteSlider,
    updateSliderOrder
} from '@/lib/data/repositories/slider.repository';
import { SliderInput } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function getAllSlidersAction() {
    try {
        const sliders = await getAllSliders();
        return { success: true, data: sliders };
    } catch (error) {
        console.error('Failed to fetch sliders:', error);
        return { success: false, error: 'Sliderlar alınamadı' };
    }
}

export async function createSliderAction(data: SliderInput) {
    try {
        const slider = await createSlider(data);
        revalidatePath('/admin/sliders');
        revalidatePath('/');
        return { success: true, data: slider };
    } catch (error) {
        console.error('Failed to create slider:', error);
        return { success: false, error: 'Slider oluşturulamadı' };
    }
}

export async function updateSliderAction(id: string, data: Partial<SliderInput>) {
    try {
        const slider = await updateSlider(id, data);
        revalidatePath('/admin/sliders');
        revalidatePath('/');
        return { success: true, data: slider };
    } catch (error) {
        console.error('Failed to update slider:', error);
        return { success: false, error: 'Slider güncellenemedi' };
    }
}

export async function deleteSliderAction(id: string) {
    try {
        await deleteSlider(id);
        revalidatePath('/admin/sliders');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete slider:', error);
        return { success: false, error: 'Slider silinemedi' };
    }
}

export async function updateSliderOrderAction(items: { id: string; order: number }[]) {
    try {
        await updateSliderOrder(items);
        revalidatePath('/admin/sliders');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to update slider order:', error);
        return { success: false, error: 'Sıralama güncellenemedi' };
    }
}
