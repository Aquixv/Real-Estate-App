"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./HeroSearch.module.css";

export default function HeroSearch() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"For Sale" | "For Rent">("For Sale");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");
  const [maxPrice, setMaxPrice] = useState("All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    // Always pass the active tab (For Sale / For Rent)
    params.set("category", activeTab);

    // Normalize typed state (e.g., "lagos " -> "Lagos") so it matches your filter options
    const trimmedLocation = location.trim();
    if (trimmedLocation) {
      const formattedState =
        trimmedLocation.charAt(0).toUpperCase() + trimmedLocation.slice(1).toLowerCase();
      params.set("state", formattedState);
    }

    if (propertyType !== "All") {
      params.set("type", propertyType);
    }

    if (maxPrice !== "All") {
      params.set("maxPrice", maxPrice);
    }

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className={styles.searchWrapper}>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "For Sale" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("For Sale")}
          type="button"
        >
          Buy
        </button>
        <button
          className={`${styles.tab} ${activeTab === "For Rent" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("For Rent")}
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
            placeholder="e.g. Lagos, Abuja"
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
            <option value="All">Any type</option>
            <option value="House">Houses</option>
            <option value="Flat / Apartment">Flats / Apartments</option>
            <option value="Land">Lands</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Max Price</label>
          <select
            className={styles.select}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            <option value="All">Any price</option>
            <option value="5000000">Up to ₦5M</option>
            <option value="20000000">Up to ₦20M</option>
            <option value="200000000">Up to ₦200M</option>
            <option value="500000000">Up to ₦500M</option>
          </select>
        </div>

        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </div>
  );
}