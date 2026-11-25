import Link from "next/link";
import styles from "../static.module.css";

const FAQS = [
  {
    q: "How do I contact an agent or landlord about a listing?",
    a: "Every property page includes direct Call and WhatsApp buttons. Clicking either connects you straight to the agent or developer who posted the listing—no middleman forms or waiting periods.",
  },
  {
    q: "Does WeHouse process rent or property purchase payments?",
    a: "No. WeHouse is a discovery and listing marketplace. All inspections, negotiations, document verifications, and payments happen directly between you and the property owner or agent.",
  },
  {
    q: "How can I stay safe when inspecting a property?",
    a: "Always inspect the property in person before paying any fees, meet agents in public or well-lit areas, and verify land or building titles with a qualified property lawyer.",
  },
  {
    q: "How do I report a suspicious or outdated listing?",
    a: "Click the 'Report' button on the property's detail page. Our team reviews flagged listings and removes anything that violates our guidelines.",
  },
  {
    q: "How can I list my properties on WeHouse?",
    a: "Self-serve agent and developer accounts are rolling out soon. In the meantime, visit our Advertise page or contact our team directly to get your listings published.",
  },
];

export default function HelpPage() {
  return (
    <main className={styles.pageWrapper}>
      <header className={styles.header}>
        <span className={styles.kicker}>SUPPORT</span>
        <h1 className={styles.title}>Help Centre</h1>
        <p className={styles.subtitle}>
          Quick answers on finding properties, contacting agents, and staying safe on WeHouse.
        </p>
      </header>

      <section className={styles.faqList}>
        {FAQS.map((item) => (
          <details key={item.q} className={styles.faqItem}>
            <summary className={styles.faqQuestion}>{item.q}</summary>
            <p className={styles.faqAnswer}>{item.a}</p>
          </details>
        ))}
      </section>

      <div className={styles.callout}>
        <div>
          <h3>Still have questions?</h3>
          <p>Reach out to our support team and we&apos;ll get back to you.</p>
        </div>
        <Link href="/contact" className={styles.primaryBtn}>
          Contact Us
        </Link>
      </div>
    </main>
  );
}