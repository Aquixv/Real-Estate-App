"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';
// Ideally move these 4 SVGs to ./NavIcons.tsx
import { ChevronDown, XIcon, SunIcon, MoonIcon } from './NavIcons';
import Logo from '/next/Logo.png'
const PROPERTY_TYPES = [
  { label: 'Houses', param: 'House' },
  { label: 'Flats / Apartments', param: 'Flat+%2F+Apartment' },
  { label: 'Lands', param: 'Land' },
  { label: 'Commercial Property', param: 'Commercial' },
];

const NAV_DROPDOWNS = [
  {
    id: 'buy',
    label: 'Buy',
    items: PROPERTY_TYPES.map((t) => ({
      label: t.label,
      href: `/properties?category=For+Sale&type=${t.param}`,
    })),
    viewAll: { label: 'View all properties for sale', href: '/properties?category=For+Sale' },
  },
  {
    id: 'rent',
    label: 'Rent',
    items: PROPERTY_TYPES.map((t) => ({
      label: t.label,
      href: `/properties?category=For+Rent&type=${t.param}`,
    })),
    viewAll: { label: 'View all properties for rent', href: '/properties?category=For+Rent' },
  },
  {
    id: 'companies',
    label: 'Companies',
    items: [
      { label: 'Estate Agents', href: '/companies/agents' },
      { label: 'Property Developers', href: '/companies/developers' },
    ],
  },
  {
    id: 'requests',
    label: 'Requests',
    items: [
      { label: 'Post a request', href: '/requests/post' },
      { label: 'View property requests', href: '/requests/view' },
    ],
  },
];

const BrandLogo = () => (
  <span className={styles.logoPlaceholder}>
    <img
      className={styles.logo}
      src="/images/Logo.png"
      alt="Logo"
    />
  </span>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' | null;
    if (current) setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMobileDropdown(null);
  };

  const toggleMobileDropdown = (id: string) => {
    setActiveMobileDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <BrandLogo />
        </Link>

        <button
          className={styles.mobileToggle}
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <span className={styles.hamburger} />
        </button>

        <div
          className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        <div className={`${styles.menuContainer} ${isOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarHeader}>
            <BrandLogo />
            <button className={styles.closeButton} onClick={closeMenu} aria-label="Close menu">
              <XIcon />
            </button>
          </div>

          <div className={styles.mobileAuthWrapper}>
            <Link href="/register" className={styles.ctaButton} onClick={closeMenu}>
              Register
            </Link>
            <Link href="/login" className={styles.ghostButton} onClick={closeMenu}>
              Sign in
            </Link>
          </div>

          <div className={styles.navLinks}>
            {NAV_DROPDOWNS.map((dropdown) => {
              const isDropdownOpen = activeMobileDropdown === dropdown.id;
              return (
                <div key={dropdown.id} className={styles.dropdown}>
                  <div className={styles.link} onClick={() => toggleMobileDropdown(dropdown.id)}>
                    {dropdown.label} <ChevronDown isOpen={isDropdownOpen} />
                  </div>
                  <div className={`${styles.dropdownContent} ${isDropdownOpen ? styles.mobileOpen : ''}`}>
                    {dropdown.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={styles.dropdownItem}
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                    {dropdown.viewAll && (
                      <>
                        <div className={styles.divider} />
                        <Link
                          href={dropdown.viewAll.href}
                          className={styles.viewAllItem}
                          onClick={closeMenu}
                        >
                          {dropdown.viewAll.label}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.ctaWrapper}>
            <div className={styles.themeToggleWrapper}>
              <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Dark Mode">
                {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
              </button>
            </div>

            <div className={styles.desktopAuthOnly}>
              <Link href="/login" className={styles.ghostButton} onClick={closeMenu}>
                Sign in
              </Link>
              <Link href="/register" className={styles.ctaButton} onClick={closeMenu}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}