import React, { useEffect, useState } from "react";
import styles from "./ArtworkGallery.module.css"; // CSS Module

const ArtworkGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch artwork data from the server
    const fetchArtworks = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth/submitArtwork");
        const data = await response.json();
        setArtworks(data);
        console.log(data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching artworks:", error);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) {
    return <p>Loading artworks...</p>;
  }

  return (
    <div className={styles.galleryContainer}>
      {artworks.length === 0 ? (
        <p>No artworks found</p>
      ) : (
        artworks.map((art) => (
          <div key={art._id} className={styles.artworkCard}>
            <img src={`http://localhost:3001/uploads/${art.coverImage}`} alt={art.title} className={styles.artworkImage} />
            <h3 className={styles.title}>{art.title}</h3>
            <p className={styles.description}>{art.shortDesc}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ArtworkGallery;
