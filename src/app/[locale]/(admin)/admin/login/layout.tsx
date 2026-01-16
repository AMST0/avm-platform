export default function AdminLoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Login sayfası sidebar olmadan tam ekran gösterilir
    return <>{children}</>;
}
