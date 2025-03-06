import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Register.module.css";
import { useAuth } from "../../store/auth";

const URL = "http://localhost:3001/api/auth/register"

const Register = () => {
  const formRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      backgroundRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
    );
  }, []);

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    pass: "",
    repass: "",
    role: "subscriber",
    bio: "",
    profilePic: null,
  });

  const {storetokenInLS} = useAuth()
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setUser({
      ...user,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(user)
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      console.log("Response data : ", response.body)

      if (response.ok) {
        const responseData = await response.json()
        storetokenInLS(responseData.token)
        alert("Registration Successful")
        setUser({ 
          fname: "",
          lname: "",
          phone: "",
          email: ""
        })
        console.log(user.fname)
      } else {
        console.log("Error inside response", "error")
      }
      
    } catch (err) {
      console.error("Error", err)
    }
    // if (formData.pass !== formData.repass) {
    //   alert("Passwords do not match!");
    //   return;
    // }

    // const formDataToSend = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   formDataToSend.append(key, formData[key]);
    // });

    // console.log(formDataToSend);
    // try {
    //   const response = await fetch("http://localhost:3001/api/auth/register", {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': "application/json",
    //     },
    //     body: JSON.stringify(formDataToSend),
    //   });

    //   const result = await response.json();
    //   if (response.ok) {
    //     alert("Registration successful!");
    //   } else {
    //     alert(`Error: ${result.msg}`);
    //   }
    // } catch (error) {
    //   console.error("Registration failed:", error);
    //   alert(error);
    // }
  };

  return (
    <div className={styles.container}>
      <div ref={backgroundRef} className={styles.background}></div>
      <div ref={formRef} className={styles.formContainer}>
        <h2 className={styles.title}>Register Now</h2>
        <p className={styles.subtitle}>Immerse yourself in creative brilliance</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            className={styles.input}
            value={user.fname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            className={styles.input}
            value={user.lname}
            onChange={handleChange}
            required
          />
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
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className={styles.input}
            value={user.phone}
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
          <input
            type="password"
            name="repass"
            placeholder="Confirm Password"
            className={styles.input}
            value={user.repass}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className={styles.select}
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="subscriber">Subscriber</option>
            <option value="artist">Artist</option>
            <option value="publisher">Publisher</option>
            <option value="admin">Admin</option>
          </select>
          <textarea
            name="bio"
            placeholder="Short Bio"
            className={styles.textarea}
            value={user.bio}
            onChange={handleChange}
          />
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleChange}
          />
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
