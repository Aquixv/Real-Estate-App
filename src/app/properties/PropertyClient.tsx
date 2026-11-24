"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/generated/prisma/client";
import styles from "./properties.module.css";

const NIGERIAN_STATES = ["Lagos", "Abuja", "Rivers", "Oyo", "Ogun", "Enugu"];

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const BedIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path>
  </svg>
);

const BathIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path>
    <line x1="10" y1="5" x2="8" y2="7"></line>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <line x1="7" y1="19" x2="7" y2="21"></line>
    <line x1="17" y1="19" x2="17" y2="21"></line>
  </svg>
);

const PlotIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 3 3 21" />
    <path d="M21 8V3h-5" />
    <path d="M3 16v5h5" />
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="7" y1="12" x2="17" y2="12" />
    <line x1="10" y1="18" x2="14" y2="18" />
  </svg>
);

interface PropertiesClientProps {
  initialProperties: Property[];
}

export default function PropertiesClient({ initialProperties }: PropertiesClientProps) {
  const searchParams = useSearchParams();

  const [searchState, setSearchState] = useState(searchParams.get("state") || "All");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [type, setType] = useState(searchParams.get("type") || "All");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "All");
  const [minBeds, setMinBeds] = useState(searchParams.get("minBeds") || "All");
  const [agent, setAgent] = useState(searchParams.get("agent") || "All");
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setSearchState(searchParams.get("state") || "All");
    setCategory(searchParams.get("category") || "All");
    setType(searchParams.get("type") || "All");
    setMaxPrice(searchParams.get("maxPrice") || "All");
    setMinBeds(searchParams.get("minBeds") || "All");
    setAgent(searchParams.get("agent") || "All");
  }, [searchParams]);

  // Prevent background scrolling while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFilterOpen]);

  const clearFilters = () => {
    setSearchState("All");
    setCategory("All");
    setType("All");
    setMaxPrice("All");
    setMinBeds("All");
    setAgent("All");
    setSortBy("default");
  };

  const filteredProperties = useMemo(() => {
    return initialProperties
      .filter((prop) => {
        if (searchState !== "All" && prop.state !== searchState) return false;
        if (category !== "All" && prop.category !== category) return false;
        if (type !== "All" && prop.type !== type) return false;
        if (maxPrice !== "All" && prop.price > Number(maxPrice)) return false;
        if (minBeds !== "All" && prop.beds < Number(minBeds)) return false;
        if (agent !== "All" && prop.agentName !== agent) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [initialProperties, searchState, category, type, maxPrice, minBeds, agent, sortBy]);

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  const activeFilterCount = [searchState, category, type, maxPrice, minBeds, agent].filter(
    (val) => val !== "All"
  ).length;

  return (
    <main className={styles.pageWrapper}>
      {/* Top Header & Quick Pills */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          {agent !== "All" ? `Properties by ${agent}` : "Property in Nigeria"}
        </h1>
        <p className={styles.subtitle}>
          Browse verified flats, houses, land, and commercial properties for sale and rent. Contact agents directly.
        </p>

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

      <div className={styles.contentGrid}>
        {/* Left Column: Sort Bar + Property Cards */}
        <section className={styles.listingsColumn}>
          <div className={styles.resultsBar}>
            <span className={styles.resultsCount}>
              Showing <strong>{filteredProperties.length}</strong>{" "}
              {filteredProperties.length === 1 ? "property" : "properties"}
            </span>

            <div className={styles.resultsControls}>
              <button
                type="button"
                className={styles.mobileFilterBtn}
                onClick={() => setIsFilterOpen(true)}
              >
                <FilterIcon />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className={styles.filterBadge}>{activeFilterCount}</span>
                )}
              </button>

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
              {filteredProperties.map((prop) => {
                const isLand = prop.type === "Land";

                return (
                  <article key={prop.id} className={styles.card}>
                    <Link href={`/properties/${prop.id}`} className={styles.cardImageWrapper}>
                      <Image
                        src={prop.image}
                        alt={prop.title}
                        fill
                        className={styles.cardImage}
                      />
                      {prop.isPremium && (
                        <span
                          className={styles.premiumBadge}
                          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                        >
                          <StarIcon /> Premium
                        </span>
                      )}
                    </Link>

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
                        <p
                          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                          className={styles.cardLocation}
                        >
                          <LocationIcon /> {prop.location}
                        </p>
                      </div>

                      <div>
                        <div className={styles.specsRow}>
                          {isLand ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              <PlotIcon /> {prop.plotSize || "Plot"}
                            </span>
                          ) : (
                            <>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                <BedIcon /> {prop.beds} Beds
                              </span>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                <BathIcon /> {prop.baths} Baths
                              </span>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                <img
                                  style={{ width: "16px", height: "16px", objectFit: "contain" }}
                                  src="https://www.svgrepo.com/show/490421/toilet.svg"
                                  alt=""
                                />{" "}
                                {prop.toilets} Toilets
                              </span>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                <img
                                  style={{ width: "16px", height: "16px", objectFit: "contain" }}
                                  src="https://www.svgrepo.com/show/308311/parking-garage-transportation-car-parking.svg"
                                  alt=""
                                />{" "}
                                {prop.parking} Parking
                              </span>
                            </>
                          )}
                        </div>

                        <div className={styles.cardFooter}>
                          <span className={styles.agentName}>{prop.agentName}</span>
                          <div className={styles.actionButtons}>
                            <a href={`tel:+${prop.agentPhone}`} className={styles.callBtn}>
                              Call
                            </a>
                            <a
                              href={`https://wa.me/${prop.agentPhone}?text=${encodeURIComponent(
                                `Hi, I'm interested in: ${prop.title}`
                              )}`}
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
                );
              })}
            </div>
          )}
        </section>

        {/* Mobile Backdrop */}
        {isFilterOpen && (
          <div
            className={styles.filterBackdrop}
            onClick={() => setIsFilterOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Right Column on Desktop / Slide-Up Bottom Sheet on Mobile */}
        <aside
          className={`${styles.filterSidebar} ${
            isFilterOpen ? styles.filterSidebarOpen : ""
          }`}
        >
          <div className={styles.drawerHandle} aria-hidden="true" />

          <div className={styles.filterHeader}>
            <h3>Advanced Filters</h3>
            <div className={styles.filterHeaderActions}>
              <button onClick={clearFilters} className={styles.clearLink}>
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className={styles.closeDrawerBtn}
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>
          </div>

          <div className={styles.filterBody}>
            <div className={styles.filterGroup}>
              <label>State</label>
              <select value={searchState} onChange={(e) => setSearchState(e.target.value)}>
                <option value="All">Any state</option>
                {NIGERIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
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
          </div>

          <div className={styles.mobileApplyBar}>
            <button
              type="button"
              className={styles.applyBtn}
              onClick={() => setIsFilterOpen(false)}
            >
              Show {filteredProperties.length}{" "}
              {filteredProperties.length === 1 ? "property" : "properties"}
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}