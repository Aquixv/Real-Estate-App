import styles from "../static.module.css";

export default function TermsPage() {
  return (
    <main className={styles.pageWrapper}>
      <header className={styles.header}>
        <span className={styles.kicker}>LEGAL</span>
        <h1 className={styles.title}>Terms of Use</h1>
        <p className={styles.updated}>Last updated: November 2026</p>
      </header>

      <div className={styles.prose}>
        <section className={styles.section}>
          <h2>1. Platform Role</h2>
          <p>
            WeHouse operates as an online real estate listing and discovery marketplace connecting property seekers with independent estate agents, landlords, and developers across Nigeria. WeHouse is not a real estate agency, broker, or party to any transaction.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Listing Accuracy</h2>
          <p>
            Property details, pricing, photos, and availability are provided by the respective listing agents or owners. While we strive to keep the platform clean and accurate, WeHouse does not guarantee the completeness or accuracy of any listing.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Due Diligence & Payments</h2>
          <p>
            WeHouse does not collect, hold, or process rent, deposits, or purchase payments. Users are solely responsible for:
          </p>
          <ul>
            <li>Physically inspecting properties before making any financial commitment.</li>
            <li>Verifying ownership, land titles, and legal documentation through qualified professionals.</li>
            <li>Confirming the identity and authority of the agent or landlord.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Prohibited Conduct</h2>
          <p>
            Users and listers may not post fraudulent listings, duplicate spam, misleading pricing, or copyrighted images without permission. We reserve the right to remove any listing or suspend accounts that violate these terms.
          </p>
        </section>
      </div>
    </main>
  );
}