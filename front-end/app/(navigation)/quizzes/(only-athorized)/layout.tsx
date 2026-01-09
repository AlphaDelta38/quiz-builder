import AuthorizeGuard from "@/lib/guards/authorizeGuard";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthorizeGuard forLoggedIn={true}>
      {children}
    </AuthorizeGuard>
  );
}

export default Layout;
