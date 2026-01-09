
import { NavLinks } from "../../constants";
import Link from "next/link";
import { Button } from "@/lib/components";

import styles from "./index.module.scss";
import { Routes } from "@/app/routes";

interface MobileMenuProps {
  mobileMenuOpen: boolean;
  closeMobileMenu: () => void;
  pathname: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  userName?: string;
  onLogout: () => void;
}

function MobileMenu({
  mobileMenuOpen,
  closeMobileMenu,
  pathname,
  isAuthenticated,
  isLoading,
  userName,
  onLogout,
}: MobileMenuProps) {
  const handleLogout = () => {
    onLogout();
    closeMobileMenu();
  };

  return (
    <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ""}`}>
      <div className={styles.mobileNavLinks}>
        {NavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ""}`}
            onClick={closeMobileMenu}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className={styles.mobileAuth}>
        {isAuthenticated ? (
          <>
            <span className={styles.mobileUserName}>{userName}</span>
            <Button variant="ghost" size="md" fullWidth onClick={handleLogout} disabled={isLoading}>
              Sing out
            </Button>
          </>
        ) : (
          <>
            <Link href={Routes.Login} onClick={closeMobileMenu}>
              <Button variant="outline" size="md" fullWidth>
                Sing in
              </Button>
            </Link>
            <Link href={Routes.Register} onClick={closeMobileMenu}>
              <Button variant="primary" size="md" fullWidth>
                Registration
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;