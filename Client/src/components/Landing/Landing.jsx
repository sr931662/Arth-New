import React, { useEffect, useRef, useContext } from 'react'
import styles from "./Landing.module.css"
import gsap from "gsap";
import hero from "../../assets/hero.png"
import begin from "../../assets/beginner_art.png"
import heart from "../../assets/heart_splash.png"
import choose from "../../assets/choose.webp"
import interm from "../../assets/intermediate.png"
import adv_art from "../../assets/adv_art.png"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Landing = () => {
    
    const tools = useRef()
    
    useGSAP(
        () => {
          const boxes = gsap.utils.toArray('.kit');
          boxes.forEach((box) => {
            gsap.to(box, {
              x: 150,
              scrollTrigger: {
                trigger: box,
                start: 'bottom bottom',
                end: 'top 20%',
                scrub: true,
                // markers: true,
              },
            });
          });
        },
        { scope: tools }
      );

  return (
    <div className={styles.landing}>
        <div className={styles.second_bg}>
                
            <div className={styles.fancy_div}>
                <div className={styles.landingContainer}>
                    <div className={styles.landingLeft}>
                        <img src="" alt={hero} className={styles.hero_img} />
                    </div>
                    <div className={styles.landingRight}>
                        <div className={styles.landingRightContainer}>
                            Elevate Your Artistry
                        </div>

                        <button className={styles.joining}>
                            Join Us Now
                        </button>
                    </div>
                </div>
            </div>
            
            <div className={styles.tools} ref={tools}>
                <div className={styles.header}>
                    Creative Resources & Tools for Artists
                </div>

                <div className={styles.tool_kits}>
                    <div className={styles.kit}>
                        <img src={begin} alt={begin} className={styles.kit_img} />
                        <h3 className={styles.tool_title}>
                            Arth Beginner Artist Kit - Unleash Your Creativity
                        </h3>
                        <h2>₹ 1,299/-</h2>
                    </div>
                    <div className={styles.kit}>
                        <img src={interm} alt={interm} className={styles.kit_img} />
                        <h3 className={styles.tool_title}>
                            Arth Inspirational Artist Kit - Ignite Your Creativity
                        </h3>
                        <h2>₹ 4,299/-</h2>
                    </div>
                    <div className={styles.kit}>
                    <img src={adv_art} alt={adv_art} className={styles.kit_img} />
                        <h3 className={styles.tool_title}>
                            Arth Advanced Artist Kit - Master The Art Of Expression
                        </h3>
                        <h2>₹ 8,999/-</h2>
                    </div>
                </div>

                {/* Authors tool kits */}
                
                <div className={styles.header}>
                    Empowering Resources & Tools for Authors
                </div>
                <div className={styles.tool_kits}>
                    <div className={styles.kit}>
                        <img src={begin} alt={begin} className={styles.kit_img} />
                        <h3 className={styles.tool_title}>
                            Arth Beginner Artist Kit - Unleash Your Creativity
                        </h3>
                        <h2>₹ 1,299/-</h2>
                    </div>
                    <div className={styles.kit}>
                        <img src={interm} alt={interm} className={styles.kit_img} />
                        <h3 className={styles.tool_title}>
                            Arth Inspirational Artist Kit - Ignite Your Creativity
                        </h3>
                        <h2>₹ 4,299/-</h2>
                    </div>
                    <div className={styles.kit}>
                    <img src={adv_art} alt={adv_art} className={styles.kit_img} />
                        <h3 className={styles.tool_title}>
                            Arth Advanced Artist Kit - Master The Art Of Expression
                        </h3>
                        <h2>₹ 8,999/-</h2>
                    </div>
                </div>
            </div>

            
            {/* <img src={heart} alt="" className={styles.heart_splash} /> */}
            <div className={styles.Journey}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.wave1}><path fill="#e3795b" fill-opacity="1" d="M0,160L17.1,186.7C34.3,213,69,267,103,261.3C137.1,256,171,192,206,181.3C240,171,274,213,309,197.3C342.9,181,377,107,411,101.3C445.7,96,480,160,514,181.3C548.6,203,583,181,617,165.3C651.4,149,686,139,720,149.3C754.3,160,789,192,823,170.7C857.1,149,891,75,926,42.7C960,11,994,21,1029,32C1062.9,43,1097,53,1131,80C1165.7,107,1200,149,1234,176C1268.6,203,1303,213,1337,192C1371.4,171,1406,117,1423,90.7L1440,64L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={styles.wave2}><path fill="#e3795b" fill-opacity="1" d="M0,160L17.1,186.7C34.3,213,69,267,103,261.3C137.1,256,171,192,206,181.3C240,171,274,213,309,197.3C342.9,181,377,107,411,101.3C445.7,96,480,160,514,181.3C548.6,203,583,181,617,165.3C651.4,149,686,139,720,149.3C754.3,160,789,192,823,170.7C857.1,149,891,75,926,42.7C960,11,994,21,1029,32C1062.9,43,1097,53,1131,80C1165.7,107,1200,149,1234,176C1268.6,203,1303,213,1337,192C1371.4,171,1406,117,1423,90.7L1440,64L1440,0L1422.9,0C1405.7,0,1371,0,1337,0C1302.9,0,1269,0,1234,0C1200,0,1166,0,1131,0C1097.1,0,1063,0,1029,0C994.3,0,960,0,926,0C891.4,0,857,0,823,0C788.6,0,754,0,720,0C685.7,0,651,0,617,0C582.9,0,549,0,514,0C480,0,446,0,411,0C377.1,0,343,0,309,0C274.3,0,240,0,206,0C171.4,0,137,0,103,0C68.6,0,34,0,17,0L0,0Z"></path></svg>
             */}
                <div className={styles.header}>
                    Unleash Your Creativity With Us!
                </div>

                <h3 className={styles.journey_sub}>
                    Our dedicated team is here to guide you on your artistic journey, ensuring you have the support needed to flourish in your craft.                
                </h3>

                <button className={styles.joining}>
                    Join Us Now
                </button>
            </div>

            <div className={styles.why_choose_us}>
                <h2 className={styles.ch_header}>
                    Why Choose Arth?
                </h2>

                <div className={styles.why_container}>
                    <div className={styles.c1}>
                    <hr />

                    <span className={styles.c_header}>
                        Exclusive Membership Packages
                    </span>
                    <p className={styles.c_main}>
                        Take your creativity further with our exclusive membership packages offering access to premium resources such as specialized workshops, networking opportunities, personlized feedback seccions from mentors - all crafted uniquely for budding artists & authors like yourself! Join today & unlock endless possibilities while being part of a thriving creative community that celebrates growth together - let's create magic together at Arth!
                    </p>

                    </div>
                    <div className={styles.c2}>
                        <img src={choose} alt="" className={styles.c_img} />

                        <span className={styles.c_header}>
                            Success Stories
                        </span>

                        <p className={styles.c_main}>
                        Dive into inspiring stories of emerging artists and authors who have transformed their dreams into reality through our programs at Arth. Witness how dedication combined with our support can lead to remarkable achievements in the creative world!
                        </p>

                    </div>

                    <div className={styles.c1}>
                    <hr />
                    
                    <span className={styles.c_header}>Upcoming Workshops & Events
                    </span>

                    <p className={styles.c_main}>
                    Stay informed about our exciting lineup of workshops designed for artists and authors at all levels. Join us for hands-on learning experiences led by industry experts who will inspire you along the way! Don’t miss these opportunities—register now!
                    </p>

                    </div>
                </div>
            </div>
    <div className={styles.we_offer}>
        <div className={styles.o1}>
            
        </div>

        <div className={styles.o2}>

        </div>

        <div className={styles.o2}>

        </div>

    </div>
        </div>

    </div>
  )
}

export default Landing