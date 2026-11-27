import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from './FeaturedComponents.module.css';

// Simple SVG Icons to avoid dependency issues
const LocationIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const BedIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"></path></svg>;
const BathIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path><line x1="10" y1="5" x2="8" y2="7"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="7" y1="19" x2="7" y2="21"></line><line x1="17" y1="19" x2="17" y2="21"></line></svg>;
const HeartIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const StarIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>;

export default async function FeaturedProperties() {
  const listings = await prisma.property.findMany({
    where: { isPremium: true },
    orderBy: { createdAt: 'desc' },
    take: 6, // Pulls all 6 seeded premium listings so the carousel actually scrolls
  });

  if (listings.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <span className={styles.kicker}>FEATURED LISTINGS</span>
          <h2 className={styles.title}>Featured properties</h2>
          <p className={styles.subtitle}>Listings from featured agents and developers, refreshed as new ones come in.</p>
        </div>
        <Link href="/properties" className={styles.viewAllBtn}>
          View all listings 
        </Link>
      </div>

      <div className={styles.carousel}>
        {listings.map((property) => (
          <div key={property.id} className={styles.card}>
            
            {/* Image & Badges Wrapper */}
            <div className={styles.imageWrapper}>
              <Link href={`/properties/${property.id}`}>
                <Image 
                  src={property.image} 
                  alt={property.title}
                  fill
                  className={styles.image}
                />
              </Link>
              {property.isPremium && (
                <div className={styles.premiumBadge}>
                  <StarIcon /> Premium
                </div>
              )}
              <button className={styles.favoriteBtn} aria-label="Save property" type="button">
                <HeartIcon />
              </button>
            </div>

            {/* Card Content */}
            <div className={styles.cardBody}>
              <h3 className={styles.price}>₦{property.price.toLocaleString()}</h3>
              <p className={styles.type}>
                {property.type} · {property.category}
              </p>
              <Link href={`/properties/${property.id}`} className={styles.propertyTitle} style={{ textDecoration: 'none' }}>
                {/* {property.title} */}
              </Link>
              
              <div className={styles.location}>
                <LocationIcon />
                <span>{property.location}</span>
              </div>

              <div className={styles.specs}>
                {property.beds > 0 && (
                  <div className={styles.specItem}>
                    <BedIcon /> {property.beds} beds
                  </div>
                )}
                {property.baths > 0 && (
                  <div className={styles.specItem}>
                    <BathIcon />{property.baths} {property.baths === 1 ? "bath" : "baths"}
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}