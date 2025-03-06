import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useAuth } from "../../store/auth";

const URL = "http://localhost:3001/api/user/profile";

const Profile = () => {
  const { getToken } = useAuth(); // Fetch stored auth token
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setUpdatedData({
            fname: data.fname,
            lname: data.lname,
            bio: data.bio,
            profilePic: data.profilePic,
          });
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className={styles.profileContainer}>
      {user ? (
        <div className={styles.profileCard}>
          <img
            src={user.profilePic || "/default-avatar.png"}
            alt="Profile"
            className={styles.profilePic}
          />
          {isEditing ? (
            <>
              <input
                type="text"
                name="fname"
                value={updatedData.fname}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="text"
                name="lname"
                value={updatedData.lname}
                onChange={handleChange}
                className={styles.input}
              />
              <textarea
                name="bio"
                value={updatedData.bio}
                onChange={handleChange}
                className={styles.textarea}
              />
              <button className={styles.saveButton} onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <>
              <h2>{user.fname} {user.lname}</h2>
              <p className={styles.bio}>{user.bio || "No bio available"}</p>
              <button className={styles.editButton} onClick={handleEditClick}>
                Edit Profile
              </button>
            </>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
