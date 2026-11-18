import Link from 'next/link';
import styles from './agentCta.module.css';

// SVG Icons
const UsersIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const StarIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const DashboardIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>;

export default function AgentCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Left Side: Content & Button */}
        <div className={styles.leftColumn}>
          <span className={styles.kicker}>LIST WITH US</span>
          <h2 className={styles.title}>Are you an estate agent or developer?</h2>
          <p className={styles.subtitle}>
            List your properties with us and put them in front of thousands of serious buyers and renters every day.
          </p>
          <Link href="/list-property" className={styles.ctaButton}>
            List your property
          </Link>
        </div>

        {/* Right Side: Benefits List */}
        <div className={styles.rightColumn}>
          
          <div className={styles.benefitItem}>
            <div className={styles.iconWrapper}><UsersIcon /></div>
            <div>
              <h4 className={styles.benefitTitle}>Thousands of property seekers</h4>
              <p className={styles.benefitDesc}>Reach serious property seekers nationwide</p>
            </div>
          </div>

          <div className={styles.benefitItem}>
            <div className={styles.iconWrapper}><StarIcon /></div>
            <div>
              <h4 className={styles.benefitTitle}>Free to list</h4>
              <p className={styles.benefitDesc}>Post your first property at no cost</p>
            </div>
          </div>

          <div className={styles.benefitItem}>
            <div className={styles.iconWrapper}><DashboardIcon /></div>
            <div>
              <h4 className={styles.benefitTitle}>Leads dashboard</h4>
              <p className={styles.benefitDesc}>See your views and enquiries for every listing in one place</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}