"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/lib/components/Button";
import styles from "./index.module.scss";
import { Routes } from "@/app/routes";
import BurgerButton from "./components/burger-button";
import { AuthNavLinks, NavLinks } from "./constants";
import MobileMenu from "./widgets/mobile-menu";
import { useAuth } from "../Auth/context/AuthContext";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navLinks}>
          {NavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && AuthNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.rightSection}>
          {isAuthenticated ? (
            <>
              <span className={styles.userName}>{user?.username}</span>
              <Button variant="ghost" size="sm" onClick={logout} disabled={isLoading}>
                Sing out
              </Button>
            </>
          ) : (
            <>
              <Link href={Routes.Login}>
                <Button variant="ghost" size="sm">
                  Sing in
                </Button>
              </Link>
              <Link href={Routes.Register}>
                <Button variant="primary" size="sm">
                  Registration
                </Button>
              </Link>
            </>
          )}
        </div>

        <BurgerButton onClick={toggleMobileMenu} open={mobileMenuOpen} />
      </div>

      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        closeMobileMenu={closeMobileMenu}
        pathname={pathname}
        isAuthenticated={isAuthenticated}
        userName={user?.username}
        isLoading={isLoading}
        onLogout={logout}
      />

      {mobileMenuOpen && (
        <div className={styles.overlay} onClick={closeMobileMenu} />
      )}
    </nav>
  );
}

export default Navbar;
