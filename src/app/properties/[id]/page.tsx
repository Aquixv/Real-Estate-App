import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaBath, FaBed, FaCar, FaChair, FaLightbulb, FaToilet,  } from "react-icons/fa";
import { mockProperties } from "@/app/data/mockProperties";
import styles from "./propertyDetail.module.css";
import PropertyActions from "./PropertyActions";
import { FaHouse } from "react-icons/fa6";

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

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  </svg>
);

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
            {property.isPremium && (
              <span
                className={styles.premiumBadge}
                style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <StarIcon /> Premium
              </span>
            )}
          </div>
          <h1 className={styles.title}>{property.title}</h1>
          <p
            style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
            className={styles.location}
          >
            <LocationIcon /> {property.location}
          </p>
          <PropertyActions/>
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
  <div className={styles.specCard}>
    <div className={styles.specIcon}><FaBed/></div>
    <div>
      <strong className={styles.specValue}>{property.beds}</strong>
      <span className={styles.specLabel}>Bedrooms</span>
    </div>
  </div>

  <div className={styles.specCard}>
    <div className={styles.specIcon}><FaBath/></div>
    <div>
      <strong className={styles.specValue}>{property.baths}</strong>
      <span className={styles.specLabel}>Bathrooms</span>
    </div>
  </div>

  <div className={styles.specCard}>
    <div className={styles.specIcon}><FaToilet/></div>
    <div>
      <strong className={styles.specValue}>{property.toilets}</strong>
      <span className={styles.specLabel}>Toilets</span>
    </div>
  </div>

  <div className={styles.specCard}>
    <div className={styles.specIcon}><FaHouse/></div>
    <div>
      <strong className={styles.specValue}>{property.type}</strong>
      <span className={styles.specLabel}>Property type</span>
    </div>
  </div>

  <div className={styles.specCard}>
    <div className={styles.specIcon}><FaChair/></div>
    <div>
      <strong className={styles.specValue}>Furnished</strong>
      <span className={styles.specLabel}>Furnishing</span>
    </div>
  </div>

  <div className={styles.specCard}>
    <div className={styles.specIcon}><FaLightbulb/></div>
    <div>
      <strong className={styles.specValue}>24/7</strong>
      <span className={styles.specLabel}>Power Supply</span>
    </div>
  </div>

  <div className={styles.specCard}>
    <div className={styles.specIcon}><FaCar/></div>
    <div>
      <strong className={styles.specValue}>
        {property.parking} {property.parking === 1 ? "space" : "spaces"}
      </strong>
      <span className={styles.specLabel}>Parking</span>
    </div>
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
              <Link
  href={`/properties?agent=${encodeURIComponent(property.agentName)}`}
  className={styles.sellerLink}
>
  View all properties by this seller
</Link>
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