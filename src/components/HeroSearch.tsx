"use client";

import { useState } from 'react';
import styles from './HeroSearch.module.css';

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState('buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('any');
  const [priceRange, setPriceRange] = useState('any');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for ${propertyType} in ${location} (${priceRange}) for ${activeTab}`);
    // Future routing logic
  };

  return (
    <div className={styles.searchWrapper}>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'buy' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('buy')}
          type="button"
        >
          Buy
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'rent' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('rent')}
          type="button"
        >
          Rent
        </button>
      </div>

      {/* Search Form */}
      <form className={styles.searchForm} onSubmit={handleSearch}>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Location</label>
          <input 
            type="text" 
            placeholder="State" 
            className={styles.input}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className={styles.divider}></div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Property Type</label>
          <select 
            className={styles.select}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="any">Any type</option>
            <option value="house">Houses</option>
            <option value="flat">Flats / Apartments</option>
            <option value="land">Lands</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Price Range</label>
          <select 
            className={styles.select}
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="any">Any price</option>
            <option value="0-5m">Under ₦5 Million</option>
            <option value="5m-20m">₦5M - ₦20M</option>
            <option value="20m-50m">₦20M - ₦50M</option>
            <option value="50m+">₦50M+</option>
          </select>
        </div>

        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
}