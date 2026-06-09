"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CATEGORY_LABELS, JournalCategory } from "@/lib/journal/types";
import styles from "./Header.module.css";

type HeaderProps = {
  transparent?: boolean;
};

const NAV_ITEMS = [
  { label: "Audit", href: "/audit", hasDropdown: false },
  { label: "Report", href: "/report", hasDropdown: false },
  { label: "Journal", href: "/journal", hasDropdown: true },
  { label: "Philosophy", href: "/philosophy", hasDropdown: false },
];

const JOURNAL_CATEGORIES = Object.keys(CATEGORY_LABELS) as JournalCategory[];

export function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [journalExpanded, setJournalExpanded] = useState(false);

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
              <li
                key={item.href}
                className={item.hasDropdown ? styles.hasDropdown : undefined}
              >
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
                {item.hasDropdown && (
                  <div className={styles.dropdown} role="menu">
                    <div className={styles.dropdownInner}>
                      {JOURNAL_CATEGORIES.map((cat) => (
                        <Link
                          key={cat}
                          href={`/journal?category=${cat}`}
                          className={styles.dropdownLink}
                          role="menuitem"
                        >
                          {CATEGORY_LABELS[cat]}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
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
                  {item.hasDropdown ? (
                    <>
                      <button
                        className={styles.mobileNavToggle}
                        onClick={() => setJournalExpanded(!journalExpanded)}
                        aria-expanded={journalExpanded}
                      >
                        {item.label}
                        <span
                          className={`${styles.mobileToggleArrow} ${journalExpanded ? styles.expanded : ""}`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>
                      {journalExpanded && (
                        <ul className={styles.mobileSub}>
                          <li>
                            <Link
                              href="/journal"
                              className={styles.mobileSubLink}
                              onClick={() => setMenuOpen(false)}
                            >
                              All Articles
                            </Link>
                          </li>
                          {JOURNAL_CATEGORIES.map((cat) => (
                            <li key={cat}>
                              <Link
                                href={`/journal?category=${cat}`}
                                className={styles.mobileSubLink}
                                onClick={() => setMenuOpen(false)}
                              >
                                {CATEGORY_LABELS[cat]}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={styles.mobileNavLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
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
