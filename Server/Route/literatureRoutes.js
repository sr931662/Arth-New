// const express = require("express");
// const jwt = require("jsonwebtoken");
// const Article = require("../DB/literaturesSchema");
// const User = require("../DB/arthSchema");
// const multer = require("multer");
// const dotenv = require("dotenv")
// dotenv.config({ path:'../config.env' })
// const router = express.Router();

// // Middleware to verify token
// const verifyToken = (req, res, next) => {
//     const token = req.header("Authorization");
//     console.log("Token received:", token); // Log the token
  
//     if (!token) {
//       console.log("Token missing!");
//       return res.status(401).json({ error: "Access denied" });
//     }
  
//     try {
//       const verified = jwt.verify(token, process.env);
//       console.log("Token verified:", process.env.SECRET_KEY);
//       req.user = verified;
//       next();
//     } catch (err) {
//       console.log("Invalid token error:", err.message);
//       res.status(400).json({ error: "Invalid token hai bhai" });
//     }
//   };
  

// // // Save an Article
// // router.post("/save", verifyToken, async (req, res) => {
// //     try {
// //       console.log("Received data:", req.body); // Check what frontend is sending
  
// //       const { title, category, tags, summary, content, featureImage } = req.body;
  
// //       // Validate required fields
// //       if (!title || !category || !summary || !content) {
// //         console.log("Validation failed: Missing fields"); // Log validation failure
// //         return res.status(400).json({ error: "Missing required fields", receivedData: req.body });
// //       }
  
// //       const article = new Article({
// //         userId: req.user.userId,
// //         title,
// //         category,
// //         tags: tags || [], // Ensure tags is an array
// //         summary,
// //         content,
// //         featureImage,
// //       });
  
// //       await article.save();
  
// //       // Add article ID to user's profile
// //       await User.findByIdAndUpdate(req.user.userId, { $push: { articles: article._id } });
  
// //       res.json({ message: "Article saved successfully", article });
// //     } catch (err) {
// //       console.error("Error saving article:", err);
// //       res.status(500).json({ error: err.message });
// //     }
// //   });

// // Set up Multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });
// const upload = multer({ storage });


//   // Save an Article (Modified to handle files)
// router.post("/save", verifyToken, upload.fields([{ name: "featureImage" }, { name: "file" }]), async (req, res) => {
//     try {
//         console.log("Received data:", req.body);
//         console.log("Received files:", req.files);

//         const { title, category, tags, summary, content } = req.body;

//         if (!title || !category || !summary || !content) {
//             return res.status(400).json({ error: "Missing required fields" });
//         }

//         const featureImage = req.files.featureImage ? req.files.featureImage[0].path : null;
//         const file = req.files.file ? req.files.file[0].path : null;

//         const article = new Article({
//             userId: req.user.userId,
//             title,
//             category,
//             tags: tags ? tags.split(",") : [],
//             summary,
//             content,
//             featureImage,
//             file,
//         });

//         await article.save();
//         await User.findByIdAndUpdate(req.user.userId, { $push: { articles: article._id } });

//         res.json({ message: "Article saved successfully", article });
//     } catch (err) {
//         console.error("Error saving article:", err);
//         res.status(500).json({ error: err.message });
//     }
// });

// // Get User's Articles
// router.get("/my-articles", verifyToken, async (req, res) => {
//   try {
//     const articles = await Article.find({ userId: req.user.userId });
//     res.json(articles);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;







const express = require("express");
const Literature = require("../DB/literatureSchema"); // Import the Mongoose model
const authMiddleware = require("../middleware/authMiddleware"); // To get logged-in user info
const router = express.Router();

// Create a new literature entry
router.post("/upload", authMiddleware, async (req, res) => {
  try {
    const { title, slug, category, tags, summary, content, document, featureImage, seoMeta } = req.body;

    // Get logged-in user's details from middleware
    const user = req.user; // `authMiddleware` sets `req.user`

    const newLiterature = new Literature({
      title,
      slug,
      category,
      tags,
      summary,
      content,
      document,
      featureImage,
      seoMeta,
      author: {
        name: user.name,
        email: user.email,
        profileImage: user.profileImage || "",
      },
    });

    await newLiterature.save();
    res.status(201).json({ message: "Literature uploaded successfully", data: newLiterature });

  } catch (error) {
    res.status(500).json({ message: "Error uploading literature", error: error.message });
  }
});

module.exports = router;
