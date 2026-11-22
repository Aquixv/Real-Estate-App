"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';

// SVG Icons
const ChevronDown = ({ isOpen = false }) => (
  <svg 
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    style={{ 
      marginLeft: 'auto', 
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease'
    }}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMobileDropdown(null);
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Handles accordion behavior on mobile, does nothing on desktop (handled by CSS hover)
  const toggleMobileDropdown = (dropdownName: string) => {
    setActiveMobileDropdown(activeMobileDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        
        {/* Left: Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoPlaceholder}><img className = {styles.logo} src="https://logowik.com/content/uploads/images/real-estate-buildings208.logowik.com.webp" alt=''></img></span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <span className={styles.hamburger}></span>
        </button>

        {/* Mobile Dark Overlay */}
        <div 
          className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} 
          onClick={closeMenu}
          aria-hidden="true"
        ></div>

        {/* Center & Right: Sliding Drawer on Mobile */}
        <div className={`${styles.menuContainer} ${isOpen ? styles.sidebarOpen : ''}`}>
          
          {/* Mobile Sidebar Header */}
          <div className={styles.sidebarHeader}>
            <span className={styles.logoPlaceholder}><img className = {styles.logo} src="https://logowik.com/content/uploads/images/real-estate-buildings208.logowik.com.webp" alt=''></img></span>
            <button className={styles.closeButton} onClick={closeMenu} aria-label="Close menu">
              <XIcon />
            </button>
          </div>

          {/* Mobile Auth Actions (Matches your reference image layout) */}
          <div className={styles.mobileAuthWrapper}>
             <Link href="/register" className={styles.ctaButton} onClick={closeMenu}>
              Register
            </Link>
            <Link href="/login" className={styles.ghostButton} onClick={closeMenu}>
              Sign in
            </Link>
          </div>

          {/* Center Links */}
          <div className={styles.navLinks}>
            
            <div className={styles.dropdown}>
              <div className={styles.link} onClick={() => toggleMobileDropdown('buy')}>
                Buy <ChevronDown isOpen={activeMobileDropdown === 'buy'} />
              </div>
              <div className={`${styles.dropdownContent} ${activeMobileDropdown === 'buy' ? styles.mobileOpen : ''}`}>
                <Link href="/properties?category=For+Sale&type=House" className={styles.dropdownItem} onClick={closeMenu}>Houses</Link>
                <Link href="/properties?category=For+Sale&type=Flat+%2F+Apartment" className={styles.dropdownItem} onClick={closeMenu}>Flats / Apartments</Link>
                <Link href="/properties?category=For+Sale&type=Land" className={styles.dropdownItem} onClick={closeMenu}>Lands</Link>
                <Link href="/properties?category=For+Sale&type=Commercial" className={styles.dropdownItem} onClick={closeMenu}>Commercial Property</Link>
                <div className={styles.divider}></div>
                <Link href="/properties?category=For+Sale" className={styles.viewAllItem} onClick={closeMenu}>View all properties for sale</Link>
              </div>
            </div>

            <div className={styles.dropdown}>
              <div className={styles.link} onClick={() => toggleMobileDropdown('rent')}>
                Rent <ChevronDown isOpen={activeMobileDropdown === 'rent'} />
              </div>
              <div className={`${styles.dropdownContent} ${activeMobileDropdown === 'rent' ? styles.mobileOpen : ''}`}>
                <Link href="/properties?category=For+Rent&type=House" className={styles.dropdownItem} onClick={closeMenu}>Houses</Link>
                <Link href="/properties?category=For+Rent&type=Flat+%2F+Apartment" className={styles.dropdownItem} onClick={closeMenu}>Flats / Apartments</Link>
                <Link href="/properties?category=For+Rent&type=Land" className={styles.dropdownItem} onClick={closeMenu}>Lands</Link>
                <Link href="/properties?category=For+Rent&type=Commercial" className={styles.dropdownItem} onClick={closeMenu}>Commercial Property</Link>
                <div className={styles.divider}></div>
                <Link href="/properties?category=For+Rent" className={styles.viewAllItem} onClick={closeMenu}>View all properties for rent</Link>
              </div>
            </div>

            <div className={styles.dropdown}>
              <div className={styles.link} onClick={() => toggleMobileDropdown('companies')}>
                Companies <ChevronDown isOpen={activeMobileDropdown === 'companies'} />
              </div>
              <div className={`${styles.dropdownContent} ${activeMobileDropdown === 'companies' ? styles.mobileOpen : ''}`}>
                <Link href="/companies/agents" className={styles.dropdownItem} onClick={closeMenu}>Estate Agents</Link>
                <Link href="/companies/developers" className={styles.dropdownItem} onClick={closeMenu}>Property Developers</Link>
              </div>
            </div>

            <div className={styles.dropdown}>
              <div className={styles.link} onClick={() => toggleMobileDropdown('requests')}>
                Requests <ChevronDown isOpen={activeMobileDropdown === 'requests'} />
              </div>
              <div className={`${styles.dropdownContent} ${activeMobileDropdown === 'requests' ? styles.mobileOpen : ''}`}>
                <Link href="/requests/post" className={styles.dropdownItem} onClick={closeMenu}>Post a request</Link>
                <Link href="/requests/view" className={styles.dropdownItem} onClick={closeMenu}>View property requests</Link>
              </div>
            </div>

          </div>

          {/* Desktop Right Side Auth & Theme */}
          <div className={styles.ctaWrapper}>
            <div className={styles.themeToggleWrapper}>
              {/* <span className={styles.mobileThemeText}>Theme</span> */}
              <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Dark Mode">
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>

            <div className={styles.desktopAuthOnly}>
              <Link href="/login" className={styles.ghostButton} onClick={closeMenu}>Sign in</Link>
              <Link href="/register" className={styles.ctaButton} onClick={closeMenu}>Register</Link>
            </div>
          </div>

        </div>
      </nav>
    </header>
  );
}