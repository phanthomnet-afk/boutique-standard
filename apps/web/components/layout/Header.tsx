"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

type HeaderProps = {
  transparent?: boolean; // for hero sections where header sits over image
};

const NAV_ITEMS = [
  { label: "Audit", href: "/audit" },
  { label: "Report", href: "/report" },
  { label: "Journal", href: "/journal" },
  { label: "Philosophy", href: "/about" },
];

export function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        styles.header,
        transparent && !scrolled ? styles.transparent : styles.solid,
        scrolled ? styles.scrolled : "",
      ].join(" ")}
    >
      <div className={styles.inner}>
        {/* Wordmark */}
        <Link href="/" className={styles.wordmark} aria-label="The Boutique Standard - Home">
          <span className={styles.wordmarkText}>The Boutique Standard</span>
        </Link>

        {/* Desktop navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/request" className={styles.ctaButton}>
            Request an Audit
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Navigation menu">
          <nav>
            <ul className={styles.mobileNavList}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={styles.mobileNavLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/request"
                  className={styles.mobileCta}
                  onClick={() => setMenuOpen(false)}
                >
                  Request an Audit
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
