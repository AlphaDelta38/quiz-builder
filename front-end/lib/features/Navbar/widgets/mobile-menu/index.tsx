
import { NavLinks } from "../../constants";
import Link from "next/link";
import { Button } from "@/lib/components";

import styles from "./index.module.scss";


interface MobileMenuProps {
  mobileMenuOpen: boolean;
  closeMobileMenu: () => void;
  pathname: string;
}

function MobileMenu({
  mobileMenuOpen,
  closeMobileMenu,
  pathname,
}: MobileMenuProps) {

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
        {true && (
          <>
            <span className={styles.mobileUserName}>{"userName"}</span>
            <Button variant="ghost" size="md" fullWidth>
              Sing out
            </Button>
          </>
        )}
        {false && (
          <>
            <Link href="/login" onClick={closeMobileMenu}>
              <Button variant="outline" size="md" fullWidth>
                Sing in
              </Button>
            </Link>
            <Link href="/register" onClick={closeMobileMenu}>
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