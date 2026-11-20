import styles from "./about.module.css";

export default function About() {
  return (
    <main className={styles.aboutMain}>
      <header className={styles.aboutHeader}>
        <h1 className={styles.title}>About Us</h1>
      </header>

      <section className={styles.splitLayout}>
        {/* Left: The Manifesto */}
        <div className={styles.manifesto}>
          <h2>
            Connecting property seekers directly with trusted agents and developers—without the noise.
          </h2>
        </div>

        {/* Right: The Details */}
        <div className={styles.details}>
          <p>
            WeHouse was built to make finding your next home, land, or commercial space straightforward. Instead of burying you in cluttered listings and dead-end links, we focus on clean discovery and direct communication.
          </p>
          <p>
            Whether you are searching for a short-term apartment, investing in land, or an agent looking to put verified listings in front of serious buyers, our platform bridges the gap so you can close deals faster and on your own terms.
          </p>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <strong>100%</strong>
              <span>Direct Connections</span>
            </div>
            <div className={styles.statItem}>
              <strong>36+</strong>
              <span>States Covered</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}