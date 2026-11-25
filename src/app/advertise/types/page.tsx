import Link from "next/link";
import styles from "../advertise.module.css";

const PROPERTY_TYPES = [
  {
    name: "Houses",
    query: "House",
    tag: "For Sale & Rent",
    description:
      "Detached duplexes, terraced homes, bungalows, and family residences in gated estates and residential neighborhoods.",
  },
  {
    name: "Flats / Apartments",
    query: "Flat / Apartment",
    tag: "For Sale & Rent",
    description:
      "Serviced apartments, self-contains, and multi-bedroom flats ideal for urban living, young professionals, and short-term stays.",
  },
  {
    name: "Land",
    query: "Land",
    tag: "For Sale",
    description:
      "Dry residential plots, estate allocations, and commercial acreage with verified documentation across major Nigerian cities.",
  },
  {
    name: "Commercial Property",
    query: "Commercial",
    tag: "For Sale & Lease",
    description:
      "Office spaces, retail shops, warehouses, and mixed-use buildings positioned in high-traffic business districts.",
  },
];

export default function PropertyTypesPage() {
  return (
    <main className={styles.pageWrapper}>
      <header className={styles.hero}>
        <span className={styles.kicker}>CATEGORIES</span>
        <h1 className={styles.title}>Types of Property</h1>
        <p className={styles.subtitle}>
          Explore what you can list and discover on WeHouse. Select any category below to browse active listings.
        </p>
      </header>

      <section className={styles.section}>
        <div className={styles.gridTwo}>
          {PROPERTY_TYPES.map((item) => (
            <div key={item.name} className={styles.typeCard}>
              <div className={styles.typeHeader}>
                <h2 className={styles.typeTitle}>{item.name}</h2>
                <span className={styles.tag}>{item.tag}</span>
              </div>
              <p className={styles.cardText}>{item.description}</p>
              <Link
                href={`/properties?type=${encodeURIComponent(item.query)}`}
                className={styles.typeLink}
              >
                Browse {item.name} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}