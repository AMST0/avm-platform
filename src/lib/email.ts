import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey && !apiKey.includes('123') ? new Resend(apiKey) : null;

export async function sendInquiryNotification({
    type,
    name,
    email,
    phone,
    message,
    details
}: {
    type: 'contact' | 'leasing';
    name: string;
    email: string;
    phone: string;
    message?: string;
    details?: any;
}) {
    const subject = type === 'contact'
        ? `Yeni İletişim Formu Mesajı: ${name}`
        : `Yeni Kiralama Başvurusu: ${details?.brand || name}`;

    if (!resend) {
        if (process.env.NODE_ENV === 'development') console.warn('Resend API key missing or invalid. Skipping email notification.');
        return { success: true, warning: 'Email not sent due to missing key' };
    }

    const { data, error } = await resend.emails.send({
        from: 'AVM Platform <onboarding@resend.dev>',
        to: [process.env.NOTIFICATION_EMAIL || 'admin@example.com'],
        subject: subject,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                <div style="background-color: #001f3f; padding: 24px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">AVM PLATFORM</h1>
                </div>
                <div style="padding: 32px; color: #1e293b;">
                    <h2 style="margin-top: 0; color: #001f3f; border-bottom: 2px solid #fbbf24; padding-bottom: 12px; display: inline-block;">
                        ${type === 'contact' ? 'İletişim Formu Mesajı' : 'Kiralama Başvurusu'}
                    </h2>
                    
                    <div style="margin-top: 24px; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
                        <p style="margin: 0 0 10px 0;"><strong>Ad Soyad:</strong> ${name}</p>
                        <p style="margin: 0 0 10px 0;"><strong>E-posta:</strong> ${email}</p>
                        <p style="margin: 0 0 10px 0;"><strong>Telefon:</strong> ${phone}</p>
                        ${details?.titleLabel ? `<p style="margin: 0 0 10px 0;"><strong>Ünvan:</strong> ${details.titleLabel}</p>` : ''}
                        ${details?.subject && type === 'contact' ? `<p style="margin: 0 0 10px 0;"><strong>Konu:</strong> ${details.subject}</p>` : ''}
                    </div>

                    ${type === 'leasing' && details ? `
                        <div style="margin-top: 24px;">
                            <h3 style="color: #001f3f; font-size: 16px; margin-bottom: 8px;">Başvuru Detayları (Mağaza):</h3>
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; background-color: #f8fafc; width: 40%;"><strong>Firma Ünvanı:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${details.firmTitle || '-'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;"><strong>Marka:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #b45309; font-weight: bold;">${details.brand || '-'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; background-color: #f8fafc;"><strong>Talep Edilen Alan:</strong></td>
                                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${details.minM2 || 0} - ${details.maxM2 || 0} m²</td>
                                </tr>
                            </table>
                        </div>
                    ` : ''}

                    ${message ? `
                        <div style="margin-top: 24px;">
                            <h3 style="color: #001f3f; font-size: 16px; margin-bottom: 8px;">Mesaj Notu:</h3>
                            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; font-style: italic; color: #475569;">
                                "${message}"
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 12px; color: #64748b;">Bu mesaj AVM Platform üzerinden otomatik olarak gönderilmiştir.</p>
                </div>
            </div>
        `,
    });

    if (error) {
        if (process.env.NODE_ENV === 'development') console.error('Email sending failed:', error);
        return { success: false, error };
    }

    return { success: true, data };
}
