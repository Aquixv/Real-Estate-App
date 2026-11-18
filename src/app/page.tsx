// Notice: NO "use client" here! This is now a Server Component.
import Image from 'next/image';
import styles from './page.module.css';
import HeroSearch from '@/components/HeroSearch';

export default function Home() {
  return (
    <main>
      <section className={styles.darkHero}>
        <Image 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Luxury Real Estate Hero"
          fill
          className={styles.darkHeroBg}
          priority
        />

        <div className={styles.heroContent}>
          {/* Swapped architecture text for real estate text */}
          
          <h1 className={styles.darkHeadline}>
            Find The Right<br/>Property
          </h1>
          
          <p className={styles.darkSubtext}>
            Search thousands of homes, land, and commercial properties for sale and rent across every major city.
          </p>
          
          {/* Injecting the interactive Client Component into the Server Component */}
          <HeroSearch />
        </div>
      </section>

      {/* ... the rest of your sections will go here ... */}
      
    </main>
  );
}