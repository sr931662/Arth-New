import React from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import ArthCanvas from "../ArthCanvas/ArthCanvas";
import EarthCanvas from "../canvas/Earth";

const Hero = () => {
  return (
    <section className={`${styles.heroSection} relative w-full h-screen mx-auto flex flex-col items-center justify-center text-center`}> 
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Welcome to <span className={styles.highlight}>Arth</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Empowering storytellers, artists, and creators through innovation and technology.
        </p>
        <button className={styles.ctaButton}>
          Start Exploring
        </button>
      </div>

      <div className={styles.scrollIndicator}>
        <motion.div
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          className={styles.scrollDot}
        />
      </div>
    </section>
  );
};

export default Hero;
