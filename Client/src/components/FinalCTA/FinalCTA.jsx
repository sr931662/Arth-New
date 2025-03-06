import React, { useEffect, useRef } from 'react';
import styles from './FinalCTA.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const ctaRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(ctaRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", 
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    const faqItems = faqRef.current.children;
    gsap.fromTo(faqItems, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out", 
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cta} ref={ctaRef}>
        <h2 className={styles.heading}>The revolution starts with you.</h2>
        <p className={styles.subheading}>Don’t miss out—join now.</p>
        <button className={styles.button}>Sign Up</button>
      </div>
      <div className={styles.faq} ref={faqRef}>
        <h3 className={styles.faqHeading}>Frequently Asked Questions</h3>
        <div className={styles.faqItem}>
          <h4>How does it work?</h4>
          <p>We provide a curated, distraction-free platform for storytellers and artists.</p>
        </div>
        <div className={styles.faqItem}>
          <h4>When will it launch?</h4>
          <p>Stay tuned! The platform is in its final development stage.</p>
        </div>
        <div className={styles.faqItem}>
          <h4>Is it free?</h4>
          <p>Yes! Our core features are completely free to use.</p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
