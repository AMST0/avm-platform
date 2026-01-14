'use server';

import db from '@/lib/db';
import { sendInquiryNotification } from '@/lib/email';
import { revalidatePath } from 'next/cache';

export async function createInquiryAction(formData: {
    type: 'contact' | 'leasing';
    name: string;
    email: string;
    phone: string;
    message?: string;
    details?: any;
}) {
    try {
        const inquiry = await db.inquiry.create({
            data: {
                type: formData.type,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
                details: formData.details || {},
            },
        });

        // Trigger Email Notification (Async, don't block response)
        sendInquiryNotification(formData).catch(console.error);

        revalidatePath('/admin/inquiries');
        return { success: true, data: inquiry };
    } catch (error) {
        console.error('Failed to create inquiry:', error);
        return { success: false, error: 'Bir hata oluştu.' };
    }
}

export async function getInquiriesAction() {
    try {
        const inquiries = await db.inquiry.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return { success: true, data: inquiries };
    } catch (error) {
        return { success: false, error: 'Veriler alınamadı.' };
    }
}

export async function updateInquiryStatusAction(id: string, status: string) {
    try {
        await db.inquiry.update({
            where: { id },
            data: { status },
        });
        revalidatePath('/admin/inquiries');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Durum güncellenemedi.' };
    }
}

export async function deleteInquiryAction(id: string) {
    try {
        await db.inquiry.delete({
            where: { id },
        });
        revalidatePath('/admin/inquiries');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Silme işlemi başarısız.' };
    }
}
