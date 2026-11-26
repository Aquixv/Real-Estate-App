import styles from "../static.module.css";

export default function PrivacyPage() {
  return (
    <main className={styles.pageWrapper}>
      <header className={styles.header}>
        <span className={styles.kicker}>LEGAL</span>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: November 2026</p>
      </header>

      <div className={styles.prose}>
        <section className={styles.section}>
          <h2>1. Information We Collect</h2>
          <p>
            When you browse WeHouse, we keep data collection minimal. We only collect information you voluntarily provide—such as your name, email address, or message when submitting our contact form, or account details if you register as a user or agent.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To respond to support inquiries and partnership requests.</li>
            <li>To display agent contact details on published property listings.</li>
            <li>To maintain platform security and prevent spam or fraudulent listings.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. External Communications</h2>
          <p>
            Clicking &ldquo;Chat on WhatsApp&rdquo; or &ldquo;Call Agent&rdquo; redirects you outside of WeHouse to third-party services. Any information you share directly with an agent or developer is governed by their own practices and the respective third-party platform&apos;s privacy policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Data Requests</h2>
          <p>
            You may request access to, correction of, or deletion of any personal information you have submitted to WeHouse at any time by reaching out through our Contact page.
          </p>
        </section>
      </div>
    </main>
  );
}