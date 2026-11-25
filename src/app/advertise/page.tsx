import Link from "next/link";
import styles from "./advertise.module.css";

export default function AdvertisePage() {
  return (
    <main className={styles.pageWrapper}>
      <header className={styles.hero}>
        <span className={styles.kicker}>LIST ON WEHOUSE</span>
        <h1 className={styles.title}>
          Put your properties in front of serious seekers.
        </h1>
        <p className={styles.subtitle}>
          Whether you are an independent agent, landlord, or property developer, WeHouse connects you directly with buyers and renters across Nigeria—no middleman fees, no clutter.
        </p>
        <div className={styles.heroActions}>
          <Link href="/contact" className={styles.primaryBtn}>
            Get Started →
          </Link>
          <Link href="/advertise/types" className={styles.secondaryBtn}>
            View Property Types
          </Link>
        </div>
      </header>

      {/* Benefits Grid */}
      <section className={styles.section}>
        <div className={styles.gridThree}>
          <div className={styles.card}>
            <span className={styles.stepBadge}>01</span>
            <h3 className={styles.cardTitle}>Direct WhatsApp & Call Leads</h3>
            <p className={styles.cardText}>
              Interested seekers message you on WhatsApp or call your line directly from the listing page. You control the conversation and the inspection schedule.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.stepBadge}>02</span>
            <h3 className={styles.cardTitle}>Zero Commission</h3>
            <p className={styles.cardText}>
              WeHouse doesn&apos;t take a cut of your sales or rent. List your properties, close deals on your own terms, and keep 100% of your commission.
            </p>
          </div>

          <div className={styles.card}>
            <span className={styles.stepBadge}>03</span>
            <h3 className={styles.cardTitle}>Clean, Filtered Discovery</h3>
            <p className={styles.cardText}>
              Seekers filter by state, budget, property type, and bedrooms—meaning the people reaching out to you are already qualified for your listing.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className={styles.ctaBanner}>
        <div>
          <h2 className={styles.bannerTitle}>Ready to list your first property?</h2>
          <p className={styles.bannerText}>
            Agent self-serve dashboards are rolling out soon. Reach out to our team to get early access.
          </p>
        </div>
        <Link href="/contact" className={styles.primaryBtn}>
          Contact Our Team
        </Link>
      </section>
    </main>
  );
}