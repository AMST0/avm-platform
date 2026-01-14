import { AdminSidebar } from '@/components/admin';
import { SpotlightSearch } from '@/components/shared';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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

