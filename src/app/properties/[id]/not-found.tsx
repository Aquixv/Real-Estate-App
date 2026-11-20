import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Property Not Found</h1>
        <p className={styles.message}>
          The listing you&apos;re looking for may have been sold, rented out, or removed by the agent.
        </p>

        <div className={styles.actions}>
          <Link href="/properties" className={styles.primaryBtn}>
            Browse All Listings
          </Link>
          <Link href="/" className={styles.secondaryBtn}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}