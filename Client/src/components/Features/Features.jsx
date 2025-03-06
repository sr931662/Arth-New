import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Features.module.css";
import SectionWrapper from "../hoc";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { title: "User Authentication", description: "Get started quickly and securely. Sign up with email, Google, or your phone number and access your personalized Arth experience.", icon: "🔒" },
  { title: "User Profiles", description: "Create a captivating profile that reflects your unique style. Share your bio, social links, and showcase your best work to attract readers and collaborators.", icon: "👤" },
  { title: "Content Upload", description: "Unleash your creativity. Upload your written works, images, and artwork in various formats and share them with a passionate community.", icon: "📤" },
  { title: "AI-Powered Tagging", description: "Effortless organization. Our intelligent AI automatically tags and categorizes your content, ensuring it reaches the right audience.", icon: "🤖" },
  { title: "Community Upvotes & Ranking", description: "A community-driven platform. Upvote the stories you love and help them rise to the top of the charts.", icon: "👍" },
  { title: "Monetization", description: "Empowering creators. Earn a living doing what you love. Arth provides multiple avenues for monetization, putting you in control of your earnings.", icon: "💰" },
  { title: "Collaboration Hub", description: "Connect and create. Find talented writers, artists, and other creators to collaborate on exciting projects and bring your visions to life.", icon: "🤝" },
  { title: "AI-Powered Growth Assistant", description: "Smart insights for growth. Our AI assistant analyzes your audience engagement to recommend optimal posting times, helping you reach more readers.", icon: "📈" },
  { title: "Self-Publishing Tool", description: "From story to eBook. Easily convert your written works into professional eBooks and sell them directly to your audience through Arth.", icon: "📖" },
  { title: "Social Media Auto-Posting", description: "Amplify your voice. Share your content seamlessly across your social media channels and connect with a wider audience.", icon: "📢" }
];

const FeatureCard = ({ feature }) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{feature.icon}</div>
      <h3 className="text-white text-[24px] font-bold">{feature.title}</h3>
      <p className="text-secondary text-[16px] mt-2">{feature.description}</p>
    </div>
  );
};

const Landing = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.utils.toArray(".timelineItem").forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.landing} relative w-full flex flex-col items-center justify-center text-center overflow-hidden px-4 md:px-8`}> 
      <h2 className={`${styles.sectionHeadText} text-center`}>Platform Features</h2>
      
      <div className={styles.timeline}>
        {features.map((feature, index) => (
          <div key={`feature-${index}`} className={`${styles.timelineItem} timelineItem w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%]`}> 
            <FeatureCard feature={feature} />
            <div className={styles.timelineConnector}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Landing, "features");
