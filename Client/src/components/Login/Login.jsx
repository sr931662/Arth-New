import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const URL = "http://localhost:3001/api/auth/login"
// const URL = "http://localhost:5175/api/auth/login"

const defaultUserData = {
    fname: "",
    lname: "",
    email: ""
}
const Login = () => {
  const formRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      backgroundRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
    );
  }, []);
  const [data, setData] = useState(defaultUserData)

  const navigate = useNavigate();
  const { storetokenInLS } = useAuth()
  
  const [ user, setUser ] = useState({
    email: "",
    pass: ""
}) 

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value})
    }
    const { User } = useAuth()
    const [userData, setUserData] = useState(true)

  const handleSubmit = async (e, res, req) => {
    e.preventDefault();
  
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("after Login : " + responseData);
        storetokenInLS(responseData.token);
  
        // Optional: Set a loading state or delay before reload to make sure UI settles
        // Optionally, store data like user's name in local storage or a global state
        localStorage.setItem("userName", responseData.fname); // Store first name in LS or context
  
        setTimeout(() => {
          // Reload the page and redirect to the home page
          window.location.href = "/";  // Redirect to home page after reload
        }, 500);  // Optional delay, adjust based on requirements (500ms or so)
      }
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <div className={styles.container}>
      <div ref={backgroundRef} className={styles.background}></div>
      <div ref={formRef} className={styles.formContainer}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Sign in to continue your journey</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="pass"
            placeholder="Password"
            className={styles.input}
            value={user.pass}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
