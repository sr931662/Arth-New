import React, { useState } from "react";
import styles from "./LiteratureUploader.module.css";
import axios from "axios"

const LiteratureUploader = ({ onUpload }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    tags: "",
    summary: "",
    content: "",
    document: null,
    featureImage: null,
    authorName: "",
    authorEmail: "",
  });

  const categories = ["Tech", "Health", "Education", "Business", "Science", "Entertainment"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.post("http://localhost:3001/api/literature/upload", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send JWT token
        },
      });

      console.log("Upload Successful:", response.data);
      onUpload(response.data);
    } catch (error) {
      console.error("Upload Failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Upload Literature</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Title *</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Slug *</label>
        <input type="text" name="slug" value={formData.slug} onChange={handleChange} required />

        <label>Category *</label>
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label>Tags (comma separated, max 10)</label>
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} />

        <label>Summary *</label>
        <textarea name="summary" value={formData.summary} onChange={handleChange} required minLength="100" maxLength="500"></textarea>

        <label>Content *</label>
        <textarea name="content" value={formData.content} onChange={handleChange} required minLength="500"></textarea>

        <label>Feature Image</label>
        <input type="file" name="featureImage" accept="image/*" onChange={handleFileChange} />

        <label>Document</label>
        <input type="file" name="document" accept=".pdf,.doc,.docx" onChange={handleFileChange} />

        <h3>Author Details</h3>
        <label>Name *</label>
        <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} required />

        <label>Email *</label>
        <input type="email" name="authorEmail" value={formData.authorEmail} onChange={handleChange} required />

        <button type="submit" className={styles.uploadButton}>Upload</button>
      </form>
    </div>
  );
};

export default LiteratureUploader;
































// import React, { useState, useRef } from "react";
// import styles from "./textEditor.module.css";
// import { Bold, Italic, Underline, Save, Image, Link } from "lucide-react";
// import { useAuth } from "../../../store/auth";

// const TextEditor = () => {
//   const [text, setText] = useState("");
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [tags, setTags] = useState("");
//   const [summary, setSummary] = useState("");
//   const [authorName, setAuthorName] = useState("");
//   const [authorBio, setAuthorBio] = useState("");
//   const [email, setEmail] = useState("");
//   const [socialLinks, setSocialLinks] = useState("");
//   const [file, setFile] = useState(null);
//   const [featureImage, setFeatureImage] = useState(null);

//   const editorRef = useRef(null);




//   // Handle text input in contentEditable div
//   const handleEditorInput = () => {
//     setText(editorRef.current.innerHTML);
//   };

//   // Handle file upload
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle feature image upload
//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFeatureImage(selectedFile);
//     }
//   };
//   const { token } = useAuth();
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const token = localStorage.getItem("token");
//     if (!token) return alert("You need to log in first");

//     // Prepare FormData to handle file/image uploads
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("category", category);
//     formData.append("tags", tags.split(",").map(tag => tag.trim())); // Convert tags to array
//     formData.append("summary", summary);
//     formData.append("content", text);
//     if (featureImage) formData.append("featureImage", featureImage);
//     if (file) formData.append("file", file);
//     try {
//       console.log("Token being sent : ", token)
//       const response = await fetch("http://localhost:3001/api/literatures/save", {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${token}`, // Add "Bearer " prefix
//         },
//         body: formData,
//       });
//       console.log(response.body)
    

//       const result = await response.json();

//       if (response.ok) {
//         alert("Article saved successfully!");
//       } else {
//         alert(result.error);
//       }
//     } catch (error) {
//       console.error("Error saving article:", error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit}>
//         <h2>Submit Your Article</h2>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           maxLength={100}
//           className={styles.input}
//         />
        
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className={styles.input}
//         >
//           <option value="">Select Category</option>
//           <option value="Tech">Tech</option>
//           <option value="Health">Health</option>
//           <option value="Education">Education</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Tags (comma-separated)"
//           value={tags}
//           onChange={(e) => setTags(e.target.value)}
//           className={styles.input}
//         />

//         <textarea
//           placeholder="Short Description"
//           value={summary}
//           onChange={(e) => setSummary(e.target.value)}
//           maxLength={300}
//           className={styles.textarea}
//         ></textarea>

//         <div className={styles.toolbar}>
//           <button type="button"><Bold size={18} /></button>
//           <button type="button"><Italic size={18} /></button>
//           <button type="button"><Underline size={18} /></button>
//           <button type="button"><Image size={18} /></button>
//           <button type="button"><Link size={18} /></button>
//           <span className={styles.word_count}>Words: {text.split(/\s+/).filter((w) => w).length}</span>
//         </div>

//         {/* Text Editor */}
//         <div
//           ref={editorRef}
//           className={styles.editor}
//           contentEditable
//           onInput={handleEditorInput}
//         ></div>

//         {/* File Uploads */}
//         <input
//           type="file"
//           accept=".pdf,.docx"
//           onChange={handleFileChange}
//           className={styles.fileInput}
//         />

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className={styles.fileInput}
//         />
        
//         {featureImage && (
//           <img
//             src={URL.createObjectURL(featureImage)}
//             alt="Feature Preview"
//             className={styles.previewImage}
//           />
//         )}

//         <h3>Author Details</h3>
//         <input
//           type="text"
//           placeholder="Author Name"
//           value={authorName}
//           onChange={(e) => setAuthorName(e.target.value)}
//           className={styles.input}
//         />

//         <textarea
//           placeholder="Author Bio"
//           value={authorBio}
//           onChange={(e) => setAuthorBio(e.target.value)}
//           className={styles.textarea}
//         ></textarea>

//         <input
//           type="email"
//           placeholder="Email (optional)"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={styles.input}
//         />

//         <input
//           type="text"
//           placeholder="Social Links (optional)"
//           value={socialLinks}
//           onChange={(e) => setSocialLinks(e.target.value)}
//           className={styles.input}
//         />

//         <div className={styles.footer}>
//           <button type="submit" className={styles.saveBtn}>
//             <Save size={18} /> Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default TextEditor;
