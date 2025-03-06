import React, {useState} from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from '../../store/auth';

const NavBar = ({ scrollToFeatures }) => {
  const { isLoggedIn } = useAuth()

  const { user } = useAuth();

  console.log("Is loggedin : ", isLoggedIn)

  return (
    <div className={styles.Navbar_container}>
      <div className={styles.nav_menu}>
        {/* Smooth Scroll to Features Section */}
      </div>

      <Link to="/" className={styles.logo}>
        <div>Arth</div>
      </Link>

      <div className={styles.nav_menu_prof}>
        
        <Link to="/for-viewers" className={styles.prof_item}>
          For Viewers
        </Link>

        <Link to="/for-artists" className={styles.prof_item}>
          For Artists
        </Link>

        <Link to="/for-writers" className={styles.prof_item}>
          For writers
        </Link>

        {isLoggedIn ?
        (<>
          <Link to="/logout" className={styles.prof_item}>Log-out</Link>
          <p>|</p>
          <span className={styles.username}>Hi, {user.fname}</span>
        </>) :
        (
          <>
          <Link to="/login" className={styles.prof_item}>Log-in</Link>
          <Link to="/sign-up" className={styles.prof_item}>
            <div className={styles.sign_btn}>Sign-up</div>
          </Link>
        </>
        )
        }
      </div>
    </div>
  );
};

export default NavBar;
