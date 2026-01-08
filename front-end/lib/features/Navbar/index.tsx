"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/lib/components/Button";
import styles from "./index.module.scss";
import { Routes } from "@/app/routes";
import BurgerButton from "./components/burger-button";
import { NavLinks } from "./constants";
import MobileMenu from "./widgets/mobile-menu";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
        </div>

        <div className={styles.rightSection}>
          {true && (
            <>
              <span className={styles.userName}>{"userName"}</span>
              <Button variant="ghost" size="sm">
                Sing out
              </Button>
            </>
          )}
          {false && (
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
      />

      {mobileMenuOpen && (
        <div className={styles.overlay} onClick={closeMobileMenu} />
      )}
    </nav>
  );
}

export default Navbar;
