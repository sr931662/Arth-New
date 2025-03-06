import React from "react";
import styles from "./teams.module.css";
import shivam from "../../assets/Teams/Shivam.jpg"
import Mansi from "../../assets/Teams/Mansi.jpg"
import Shashwat from "../../assets/Teams/Shashwat.jpg"

const teamMembers = [
  {
    name: "Mr. Shashwat Kashyap",
    role: "Co-Founder & CEO",
    image: Shashwat,
    description: "Innovative Strategist",
  },
  {
    name: "Mr. Shivam Singh",
    role: "Co-Founder & CTO",
    image: shivam,
    description: "Technical Architecture Management",
  },
  {
    name: "Ms. Mansi Gupta",
    role: "Co-Founder, Art Director & Creative Strategist",
    image: Mansi,
    description: "Creative Strategist",
  }

];

const Teams = () => {
  return (
    <div className={styles.teamSection}>
      <h2 className={styles.heading}>Meet Our Team</h2>
      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.teamCard}>
            <img src={member.image} alt={member.name} className={styles.image} />
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.role}>{member.role}</p>
            <p className={styles.description}>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
