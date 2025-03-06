import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Artists.module.css";
import { LayoutGrid, ImageUp, SlidersHorizontal, UserRoundCog } from "lucide-react"

const tabs = ["upload", "uploads", "page", "profile"];

const ArtistSlider = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const prevTabIndex = useRef(0);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const buttonsRef = useRef([]);

  useEffect(() => {
    // Sidebar Animation
    gsap.fromTo(
      sidebarRef.current,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Sidebar Buttons Animation
    gsap.fromTo(
      buttonsRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  const handleTabChange = (newTab) => {
    const newIndex = tabs.indexOf(newTab);
    const prevIndex = prevTabIndex.current;
    const direction = newIndex > prevIndex ? "up" : "down";
    prevTabIndex.current = newIndex;

    gsap.fromTo(
      contentRef.current,
      {
        y: direction === "up" ? 500 : -500,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      }
    );

    setActiveTab(newTab);
  };

  return (
    <div className={styles.container}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar} ref={sidebarRef}>
        <nav className={styles.nav}>
          {tabs.map((tab, index) => (
            <button
              key={tab}
              ref={(el) => (buttonsRef.current[index] = el)}
              className={`${styles.navItem} ${
                activeTab === tab ? styles.active : ""
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab === "upload" && <ImageUp className={styles.icon} />}
              {tab === "uploads" && <LayoutGrid className={styles.icon} />}
              {tab === "page" && <SlidersHorizontal className={styles.icon} />}
              {tab === "profile" && <UserRoundCog className={styles.icon} />}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className={styles.content} ref={contentRef}>
        {activeTab === "upload" && <h2>Upload Your Content</h2>}
        {activeTab === "uploads" && <h2>Your Uploads</h2>}
        {activeTab === "page" && <h2>Page Settings</h2>}
        {activeTab === "profile" && <h2>Profile Settings</h2>}
      </main>
    </div>
  );
};

export default ArtistSlider;
