import { useState } from "react";
import styles from "./ArtworkForm.module.css";

const ArtworkForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    shortDesc: "",
    fullDesc: "",
    files: [],
    coverImage: "",
    visibility: "Public",
    license: "Copyrighted",
    forSale: false,
    price: "",
    socialLinks: "",
    portfolio: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file, // ✅ Store actual File object
      url: URL.createObjectURL(file), // Preview URL
      fileName: file.name,
    }));
    setFormData((prev) => ({
      ...prev,
      files,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("shortDesc", formData.shortDesc);
    formDataToSend.append("fullDesc", formData.fullDesc);
    formDataToSend.append("visibility", formData.visibility);
    formDataToSend.append("license", formData.license);
    formDataToSend.append("forSale", formData.forSale);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("socialLinks", formData.socialLinks);
    formDataToSend.append("portfolio", formData.portfolio);

    // ✅ Append Cover Image (Check if it's a File or a URL)
    if (formData.coverImage instanceof File) {
        formDataToSend.append("coverImage", formData.coverImage);
    } else {
        formDataToSend.append("coverImageURL", formData.coverImage); // If it's a URL, send it as a string
    }

    // ✅ Append Multiple Files (Actual Files)
    formData.files.forEach((file) => {
      console.log(file.url)
        formDataToSend.append("files", file.url); // Append the File object
    });

    try {
        const response = await fetch("http://localhost:3001/api/auth/submitArtwork", {
            method: "POST",
            body: formDataToSend, // No need for 'Content-Type', it's set automatically
        });

        const data = await response.json();
        if (response.ok) {
            alert("Artwork uploaded successfully!");
            console.log("Response Data:", data);
        } else {
            alert("Error: " + data.msg);
        }
    } catch (error) {
        console.error("Upload failed", error);
    }
};



//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("category", formData.category);
//     formDataToSend.append("shortDesc", formData.shortDesc);
//     formDataToSend.append("fullDesc", formData.fullDesc);
//     formDataToSend.append("visibility", formData.visibility);
//     formDataToSend.append("license", formData.license);
//     formDataToSend.append("forSale", formData.forSale);
//     formDataToSend.append("price", formData.price);
//     formDataToSend.append("socialLinks", formData.socialLinks);
//     formDataToSend.append("portfolio", formData.portfolio);

//     // ✅ Append Cover Image (Ensure it's a File, not a string)
//     if (formData.coverImage instanceof File) {
//       console.log(formData.coverImage);
//         formDataToSend.append("coverImage", formData.coverImage);
//     }

//     // ✅ Append Multiple Files
//     formData.files.forEach((file) => {
//       console.log(file.url)
//       formDataToSend.append("files", file);
//     });

//     try {
//         const response = await fetch("http://localhost:3001/api/auth/submitArtwork", {
//             method: "POST",
//             body: formDataToSend, // No need for 'Content-Type', it's set automatically
//         });

//         const data = await response.json();
//         if (response.ok) {
//             alert("Artwork uploaded successfully!");
//             console.log("Response Data:", data);
//         } else {
//             alert("Error: " + data.msg);
//         }
//     } catch (error) {
//         console.error("Upload failed", error);
//     }
// };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("http://localhost:3001/api/auth/submitArtwork", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   });
  
  //   const data = await response.json();
  //   console.log(data)
  //   if (response.ok) {
  //     alert("Artwork submitted successfully!");
  //     console.log(data)
  //   } else {
  //     alert("Error submitting artwork: " + data.message);
  //   }
  // };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Submit Your Artwork</h2>
      
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Category (comma-separated)</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <label>Short Description (max 300 chars)</label>
      <textarea
        name="shortDesc"
        value={formData.shortDesc}
        onChange={handleChange}
        maxLength="300"
        required
      />

      <label>Full Description</label>
      <textarea
        name="fullDesc"
        value={formData.fullDesc}
        onChange={handleChange}
        required
      />

      <label>Upload Files</label>
      <input type="file" multiple onChange={handleFileUpload} />

      {formData.files.length > 0 && (
        <div className={styles.preview}>
          {formData.files.map((file, index) => (
            <div key={index} className={styles.fileItem}>
              <img src={file.url} alt="preview" className={styles.thumbnail} />
              <p>{file.fileName}</p>
            </div>
          ))}
        </div>
      )}

      <label>Cover Image URL</label>
      <input
        type="text"
        name="coverImage"
        value={formData.coverImage}
        onChange={handleChange}
      />

      <label>Visibility</label>
      <select name="visibility" value={formData.visibility} onChange={handleChange}>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
        <option value="Followers Only">Followers Only</option>
      </select>

      <label>License</label>
      <select name="license" value={formData.license} onChange={handleChange}>
        <option value="Creative Commons">Creative Commons</option>
        <option value="Royalty-Free">Royalty-Free</option>
        <option value="Copyrighted">Copyrighted</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="forSale"
          checked={formData.forSale}
          onChange={handleChange}
        />
        Available for Sale
      </label>

      {formData.forSale && (
        <>
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </>
      )}

      <label>Social Links</label>
      <input
        type="text"
        name="socialLinks"
        value={formData.socialLinks}
        onChange={handleChange}
      />

      <label>Portfolio URL</label>
      <input
        type="text"
        name="portfolio"
        value={formData.portfolio}
        onChange={handleChange}
      />

      <button type="submit" className={styles.submitBtn}>Submit</button>
    </form>
  );
};

export default ArtworkForm;
