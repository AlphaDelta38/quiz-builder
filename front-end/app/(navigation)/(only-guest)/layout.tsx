import AuthorizeGuard from "@/lib/guards/authorizeGuard";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthorizeGuard forLoggedIn={false}>
      {children}
    </AuthorizeGuard>
  );
}

export default Layout;
