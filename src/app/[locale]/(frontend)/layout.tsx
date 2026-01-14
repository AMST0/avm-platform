import { Header, Footer, SpotlightSearch } from '@/components/shared';
import { PopupDisplay } from '@/components/frontend/popup-display';

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <SpotlightSearch />
            <PopupDisplay />
            <main className="min-h-screen pt-16 lg:pt-20">
                {children}
            </main>
            <Footer />
        </>
    );
}

