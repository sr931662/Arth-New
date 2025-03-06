import React, { useEffect, useRef } from 'react';
import styles from './WhatsComing.module.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhatsComing = () => {
  const featuresRef = useRef(null);

  useEffect(() => {
    const elements = featuresRef.current.children;
    gsap.fromTo(elements, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out", 
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>What's Coming?</h2>
      <p className={styles.subheading}>Sneak Peek at MVP Features</p>
      <div className={styles.features} ref={featuresRef}>
        <div className={styles.featureCard}>
          <span className={styles.icon}>📖</span>
          <h3>Story Discovery</h3>
          <p>Curated, personalized, and fair.</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.icon}>💰</span>
          <h3>Creator Rewards</h3>
          <p>Writers get what they deserve.</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.icon}>🌍</span>
          <h3>Community-Driven</h3>
          <p>Built with and for storytellers.</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.icon}>🚀</span>
          <h3>Innovative Platform</h3>
          <p>No ads, no distractions, just stories.</p>
        </div>
      </div>
    </div>
  );
};

export default WhatsComing;
