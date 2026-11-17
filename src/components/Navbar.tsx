"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // Uncomment when you have your logo
import styles from './navbar.module.css';

// SVG Icons
const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
    <polyline points="6 9 12 15 18 9"></polyline>
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

  const closeMenu = () => setIsOpen(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add your dark mode logic here (e.g., next-themes or document.body.classList.toggle)
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
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}></span>
        </button>

        {/* Center & Right: Grouped for Mobile Dropdown */}
        <div className={`${styles.menuContainer} ${isOpen ? styles.menuOpen : ''}`}>
          
          {/* Center Links with Hover Dropdowns */}
          <div className={styles.navLinks}>
            
            <div className={styles.dropdown}>
              <span className={styles.link}>Buy <ChevronDown /></span>
              <div className={styles.dropdownContent}>
                <Link href="/buy/houses" className={styles.dropdownItem} onClick={closeMenu}>Houses</Link>
                <Link href="/buy/flats" className={styles.dropdownItem} onClick={closeMenu}>Flats / Apartments</Link>
                <Link href="/buy/lands" className={styles.dropdownItem} onClick={closeMenu}>Lands</Link>
                <Link href="/buy/commercial" className={styles.dropdownItem} onClick={closeMenu}>Commercial Property</Link>
                <div className={styles.divider}></div>
                <Link href="/buy" className={styles.viewAllItem} onClick={closeMenu}>View all properties for sale</Link>
              </div>
            </div>

            <div className={styles.dropdown}>
              <span className={styles.link}>Rent <ChevronDown /></span>
              <div className={styles.dropdownContent}>
                <Link href="/rent/houses" className={styles.dropdownItem} onClick={closeMenu}>Houses</Link>
                <Link href="/rent/flats" className={styles.dropdownItem} onClick={closeMenu}>Flats / Apartments</Link>
                <Link href="/rent/lands" className={styles.dropdownItem} onClick={closeMenu}>Lands</Link>
                <Link href="/rent/commercial" className={styles.dropdownItem} onClick={closeMenu}>Commercial Property</Link>
                <div className={styles.divider}></div>
                <Link href="/rent" className={styles.viewAllItem} onClick={closeMenu}>View all properties for rent</Link>
              </div>
            </div>

            <div className={styles.dropdown}>
              <span className={styles.link}>Companies <ChevronDown /></span>
              <div className={styles.dropdownContent}>
                <Link href="/companies/agents" className={styles.dropdownItem} onClick={closeMenu}>Estate Agents</Link>
                <Link href="/companies/developers" className={styles.dropdownItem} onClick={closeMenu}>Property Developers</Link>
              </div>
            </div>

            <div className={styles.dropdown}>
              <span className={styles.link}>Requests <ChevronDown /></span>
              <div className={styles.dropdownContent}>
                <Link href="/requests/post" className={styles.dropdownItem} onClick={closeMenu}>Post a request</Link>
                <Link href="/requests/view" className={styles.dropdownItem} onClick={closeMenu}>View property requests</Link>
              </div>
            </div>

          </div>

          {/* Right Side: Theme Toggle & Auth Actions */}
          <div className={styles.ctaWrapper}>
            <button 
              onClick={toggleTheme} 
              className={styles.themeToggle}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            <Link href="/login" className={styles.ghostButton} onClick={closeMenu}>
              Sign in
            </Link>
            <Link href="/register" className={styles.ctaButton} onClick={closeMenu}>
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}