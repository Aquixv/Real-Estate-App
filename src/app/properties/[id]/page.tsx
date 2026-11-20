import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockProperties } from "@/app/data/mockProperties";
import styles from "./propertyDetail.module.css";

interface PropertyDetailProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailProps) {
  const { id } = await params;

  // Later, you'll swap this single line for:
  // const property = await prisma.property.findUnique({ where: { id } });
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;
  const whatsappUrl = `https://wa.me/${property.agentPhone}?text=${encodeURIComponent(
    `Hi ${property.agentName}, I'm interested in your listing: ${property.title} (${formatPrice(property.price)}). Is it still available?`
  )}`;

  return (
    <main className={styles.pageWrapper}>
      {/* Breadcrumb / Back Link */}
      <div className={styles.topNav}>
        <Link href="/properties" className={styles.backLink}>
          Back to all listings
        </Link>
      </div>

      {/* Title & Price Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.badges}>
            <span className={styles.categoryBadge}>{property.category}</span>
            <span className={styles.typeBadge}>{property.type}</span>
            {property.isPremium && <span className={styles.premiumBadge}>Premium</span>}
          </div>
          <h1 className={styles.title}>{property.title}</h1>
          <p style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }} className={styles.location}> <img style={{ width: '16px', height: '16px', objectFit: 'contain' }} src="https://www.svgrepo.com/show/532539/location-pin.svg" alt="" />{property.location}</p>
        </div>

        <div className={styles.headerRight}>
          <span className={styles.priceLabel}>Price</span>
          <p className={styles.price}>{formatPrice(property.price)}</p>
        </div>
      </header>

      {/* Main Hero Image */}
      <div className={styles.imageContainer}>
        <Image
          src={property.image}
          alt={property.title}
          fill
          className={styles.heroImage}
          priority
        />
      </div>

      {/* 2-Column Details + Sticky Agent Card */}
      <div className={styles.contentGrid}>
        
        {/* Left Column: Specs & Description */}
        <section className={styles.detailsColumn}>
          <div className={styles.specsGrid}>
            <div className={styles.specBox}>
              <span className={styles.specLabel}>Bedrooms</span>
              <strong className={styles.specValue}>{property.beds}</strong>
            </div>
            <div className={styles.specBox}>
              <span className={styles.specLabel}>Bathrooms</span>
              <strong className={styles.specValue}>{property.baths}</strong>
            </div>
            <div className={styles.specBox}>
              <span className={styles.specLabel}>Toilets</span>
              <strong className={styles.specValue}>{property.toilets}</strong>
            </div>
            <div className={styles.specBox}>
              <span className={styles.specLabel}>Parking</span>
              <strong className={styles.specValue}>{property.parking}</strong>
            </div>
          </div>

          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Property Description</h2>
            <p className={styles.description}>{property.description}</p>
          </div>

          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <div className={styles.overviewList}>
              <div className={styles.overviewRow}>
                <span>Reference ID</span>
                <strong>{property.id.toUpperCase()}</strong>
              </div>
              <div className={styles.overviewRow}>
                <span>State</span>
                <strong>{property.state}</strong>
              </div>
              <div className={styles.overviewRow}>
                <span>Category</span>
                <strong>{property.category}</strong>
              </div>
              <div className={styles.overviewRow}>
                <span>Property Type</span>
                <strong>{property.type}</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Sticky Agent Contact Card */}
        <aside className={styles.sidebar}>
          <div className={styles.agentCard}>
            <span className={styles.agentLabel}>Listed by</span>
            <h3 className={styles.agentName}>{property.agentName}</h3>
            <p className={styles.agentSubtext}>
              Reach out directly to schedule an inspection or ask questions about this property.
            </p>

            <div className={styles.ctaStack}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                Chat on WhatsApp
              </a>
              <a href={`tel:+${property.agentPhone}`} className={styles.callBtn}>
                Call Agent (+{property.agentPhone})
              </a>
            </div>
          </div>

          <div className={styles.safetyCard}>
            <h4>Safety Tips</h4>
            <ul>
              <li>Inspect the property in person before making any payments.</li>
              <li>Verify property documents and ownership with a qualified lawyer.</li>
              <li>Meet agents in public or well-lit locations.</li>
            </ul>
          </div>
        </aside>

      </div>
    </main>
  );
}