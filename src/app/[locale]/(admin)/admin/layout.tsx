'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin';
import { SpotlightSearch } from '@/components/shared';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname?.includes('/admin/login');

    // Login sayfasında sidebar ve layout gösterme
    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />
            <SpotlightSearch />
            <main className="flex-1 ms-[68px] transition-[margin] duration-300">
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
