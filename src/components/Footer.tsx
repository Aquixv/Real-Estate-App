import Link from 'next/link';
import styles from './Footer.module.css';

async function getCachedYear() {
  'use cache'
  return new Date().getFullYear()
}

export default async function Footer() {
const year = await getCachedYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Column 1: Brand & Bio */}
        <div className={styles.brandColumn}>
          <Link href="/" className={styles.logo}>
            WeHouse
          </Link>
          <p className={styles.description}>
            WeHouse is a leading property website, with listings for sale, rent and lease. We give property seekers an easy way to find homes, land, shops, office spaces and other commercial property across the country.
          </p>
        </div>

        {/* Column 2: Popular Property */}
        <div className={styles.linkColumn}>
          <h4 className={styles.heading}>Popular property</h4>
          <ul className={styles.list}>
            <li><Link href="/properties?category=For+Rent&type=House&state=Lagos">Houses for rent in Lagos</Link></li>
<li><Link href="/properties?category=For+Rent&type=Flat+%2F+Apartment&state=Lagos">Flats for rent in Lagos</Link></li>
<li><Link href="/properties?category=For+Sale&type=House&state=Lagos">Houses for sale in Lagos</Link></li>
<li><Link href="/properties?category=For+Rent&type=House&state=Abuja">Houses for rent in Abuja</Link></li>
          </ul>
        </div>

        {/* Column 3: Explore */}
        <div className={styles.linkColumn}>
          <h4 className={styles.heading}>Explore</h4>
          <ul className={styles.list}>
            <li><Link href="/agents">Estate agents</Link></li>
            <li><Link href="/developers">Property developers</Link></li>
            {/* <li><Link href="/trends/price-index">Rent and house price index</Link></li>
            <li><Link href="/trends/demand-supply">Demand vs supply</Link></li> */}
          </ul>
        </div>

        {/* Column 4: Advertise */}
        <div className={styles.linkColumn}>
          <h4 className={styles.heading}>Advertise</h4>
          <ul className={styles.list}>
            <li><Link href="/advertise">Advertise your property</Link></li>
            <li><Link href="/advertise/types">Types of Property</Link></li>
            {/* <li><Link href="/advertise/premium">Premium Plus</Link></li>
            <li><Link href="/advertise/boost">Boost your listing</Link></li> */}
          </ul>
        </div>

        {/* Column 5: Support */}
        <div className={styles.linkColumn}>
          <h4 className={styles.heading}>Support</h4>
          <ul className={styles.list}>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/help">Help centre</Link></li>
            <li><Link href="/contact">Contact us</Link></li>
            {/* <li><Link href="/apps">Mobile apps</Link></li> */}
          </ul>
        </div>

      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p>© {year} WeHouse. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}