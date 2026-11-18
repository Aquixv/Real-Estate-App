import Link from 'next/link';
import styles from './PopularLocations.module.css';

const locations = [
  { city: 'Lagos', count: '135,341', slug: 'lagos' },
  { city: 'Abuja', count: '23,135', slug: 'abuja' },
  { city: 'Oyo', count: '3,581', slug: 'oyo' },
  { city: 'Ogun', count: '2,292', slug: 'ogun' },
  { city: 'Rivers', count: '2,257', slug: 'rivers' },
  { city: 'Enugu', count: '900', slug: 'enugu' },
];

export default function PopularLocations() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.kicker}>POPULAR LOCATIONS</span>
        <h2 className={styles.title}>Explore property by city</h2>
        <p className={styles.subtitle}>Find where your next home could be, from buzzing cities to quiet neighbourhoods.</p>
      </div>

      <div className={styles.grid}>
        {locations.map((loc) => (
          <Link href={`/locations/${loc.slug}`} key={loc.city} className={styles.card}>
            <span className={styles.status}>AVAILABLE NOW</span>
            <h3 className={styles.count}>{loc.count}</h3>
            <div className={styles.cardBottom}>
              <div>
                <h4 className={styles.cityName}>{loc.city}</h4>
                <p className={styles.desc}>properties for sale & rent</p>
              </div>
              {/* <span className={styles.exploreLink}>Explore</span> */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}