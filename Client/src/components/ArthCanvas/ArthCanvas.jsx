import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ArthCanvas.module.css";

const ArthCanvas = () => {
  const blobRef = useRef(null);

  useEffect(() => {
    gsap.to(blobRef.current, {
      borderRadius: ["50% 40% 60% 50%", "45% 55% 50% 60%", "50% 45% 55% 45%"],
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      repeat: -1,
      duration: 5,
      ease: "power1.inOut",
    });
  }, []);

  return <div ref={blobRef} className={styles.blob}></div>;
};

export default ArthCanvas;
