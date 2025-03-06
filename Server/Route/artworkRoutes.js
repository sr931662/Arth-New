// const express = require("express");
// const multer = require("multer");
// const Artwork = require("../Models/Artwork");

// const router = express.Router();

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, "uploads/"),
//     filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });
// const upload = multer({ storage });

// // 📌 Submit Artwork
// router.post("/submit", upload.array("files"), async (req, res) => {
//     try {
//         const {
//             title, category, shortDesc, fullDesc, visibility,
//             license, forSale, price, socialLinks, portfolio
//         } = req.body;

//         const newArtwork = new Artwork({
//             title,
//             category: JSON.parse(category), // Since categories come as an array
//             shortDesc,
//             fullDesc,
//             visibility,
//             license,
//             forSale: forSale === "true",
//             price: parseFloat(price) || 0,
//             socialLinks,
//             portfolio,
//             coverImage: req.files[0]?.path, // First file as cover image
//             files: req.files.map(file => file.path), // Save file paths
//         });

//         await newArtwork.save();
//         res.status(201).json({ success: true, message: "Artwork submitted successfully!" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// });

// // 📌 Get All Artworks
// router.get("/all", async (req, res) => {
//     try {
//         const artworks = await Artwork.find();
//         res.status(200).json(artworks);
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Error fetching artworks" });
//     }
// });

// module.exports = router;
