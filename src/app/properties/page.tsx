"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockProperties, NIGERIAN_STATES } from "@/app/data/mockProperties";
import styles from "properties.module.css"

export default function PropertiesPage() {
  // Filter States
  const [searchState, setSearchState] = useState("All");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [maxPrice, setMaxPrice] = useState("All");
  const [minBeds, setMinBeds] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const clearFilters = () => {
    setSearchState("All");
    setCategory("All");
    setType("All");
    setMaxPrice("All");
    setMinBeds("All");
    setSortBy("default");
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    return mockProperties
      .filter((prop) => {
        if (searchState !== "All" && prop.state !== searchState) return false;
        if (category !== "All" && prop.category !== category) return false;
        if (type !== "All" && prop.type !== type) return false;
        if (maxPrice !== "All" && prop.price > Number(maxPrice)) return false;
        if (minBeds !== "All" && prop.beds < Number(minBeds)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0; // default
      });
  }, [searchState, category, type, maxPrice, minBeds, sortBy]);

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  return (
    <main className={styles.pageWrapper}>
      {/* Top Header & Quick Pills */}
      <header className={styles.header}>
        <h1 className={styles.title}>Property in Nigeria</h1>
        <p className={styles.subtitle}>
          Browse verified flats, houses, land, and commercial properties for sale and rent. Contact agents directly.
        </p>

        {/* Quick State Pills */}
        <div className={styles.pillRow}>
          <span className={styles.pillLabel}>Browse by state:</span>
          <div className={styles.pills}>
            <button
              className={`${styles.pill} ${searchState === "All" ? styles.pillActive : ""}`}
              onClick={() => setSearchState("All")}
            >
              All States
            </button>
            {NIGERIAN_STATES.map((st) => (
              <button
                key={st}
                className={`${styles.pill} ${searchState === st ? styles.pillActive : ""}`}
                onClick={() => setSearchState(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main 2-Column Layout */}
      <div className={styles.contentGrid}>
        
        {/* Left Column: Sort Bar + Property Cards */}
        <section className={styles.listingsColumn}>
          <div className={styles.resultsBar}>
            <span className={styles.resultsCount}>
              Showing <strong>{filteredProperties.length}</strong> properties
            </span>
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {filteredProperties.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No properties match your filters</h3>
              <p>Try adjusting your price range or clearing your filters.</p>
              <button onClick={clearFilters} className={styles.clearBtn}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={styles.cardsStack}>
              {filteredProperties.map((prop) => (
                <article key={prop.id} className={styles.card}>
                  {/* Image Section */}
                  <Link href={`/properties/${prop.id}`} className={styles.cardImageWrapper}>
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      className={styles.cardImage}
                    />
                    {prop.isPremium && <span className={styles.premiumBadge}>Premium</span>}
                  </Link>

                  {/* Details Section */}
                  <div className={styles.cardContent}>
                    <div>
                      <div className={styles.priceRow}>
                        <h2 className={styles.price}>{formatPrice(prop.price)}</h2>
                        <span className={styles.categoryTag}>{prop.category}</span>
                      </div>
                      <p className={styles.typeText}>{prop.type}</p>

                      <Link href={`/properties/${prop.id}`} className={styles.cardTitle}>
                        {prop.title}
                      </Link>
                      <p className={styles.cardDesc}>{prop.description}</p>
                      <p className={styles.cardLocation}>📍 {prop.location}</p>
                    </div>

                    <div>
                      <div className={styles.specsRow}>
                        <span>🛏 {prop.beds} Beds</span>
                        <span>🛁 {prop.baths} Baths</span>
                        <span>🚽 {prop.toilets} Toilets</span>
                        <span>🚗 {prop.parking} Parking</span>
                      </div>

                      <div className={styles.cardFooter}>
                        <span className={styles.agentName}>{prop.agentName}</span>
                        <div className={styles.actionButtons}>
                          <a href={`tel:+${prop.agentPhone}`} className={styles.callBtn}>
                            Call
                          </a>
                          <a
                            href={`https://wa.me/${prop.agentPhone}?text=${encodeURIComponent(`Hi, I'm interested in: ${prop.title}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.whatsappBtn}
                          >
                            Contact Agent
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Right Column: Sticky Advanced Filters Sidebar */}
        <aside className={styles.filterSidebar}>
          <div className={styles.filterHeader}>
            <h3>Advanced Filters</h3>
            <button onClick={clearFilters} className={styles.clearLink}>
              Clear all
            </button>
          </div>

          <div className={styles.filterGroup}>
            <label>State</label>
            <select value={searchState} onChange={(e) => setSearchState(e.target.value)}>
              <option value="All">Any state</option>
              {NIGERIAN_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All categories</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Property Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="All">Any type</option>
              <option value="Flat / Apartment">Flat / Apartment</option>
              <option value="House">House</option>
              <option value="Land">Land</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Max Price</label>
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
              <option value="All">Any price</option>
              <option value="5000000">Up to ₦5M</option>
              <option value="20000000">Up to ₦20M</option>
              <option value="200000000">Up to ₦200M</option>
              <option value="500000000">Up to ₦500M</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Bedrooms</label>
            <select value={minBeds} onChange={(e) => setMinBeds(e.target.value)}>
              <option value="All">Any beds</option>
              <option value="1">1+ Beds</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
              <option value="4">4+ Beds</option>
            </select>
          </div>
        </aside>

      </div>
    </main>
  );
}