const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  title: String,
  category: String,
  shortDesc: String,
  fullDesc: String,
  coverImage: { 
    data: Buffer, 
    contentType: String 
  },  // Store image as Blob (Buffer)
  files: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
  visibility: String,
  license: String,
  forSale: Boolean,
  price: Number,
  socialLinks: String,
  portfolio: String,
});

module.exports = mongoose.model("Artwork", artworkSchema);










// const mongoose = require("mongoose");


// const artworkSchema = new mongoose.Schema(
//     {
//         title: { type: String, required: true, trim: true },
//         category: { type: [String], required: true },
//         shortDesc: { type: String, required: true, maxlength: 300 },
//         fullDesc: { type: String, required: true },
//         files: [
//           {
//             url: { type: String, required: true },
//             fileName: { type: String, required: true },
//           },
//         ],
//         coverImage: { type: String },
//         visibility: {
//           type: String,
//           enum: ["Public", "Private", "Followers Only"],
//           default: "Public",
//         },
//         license: {
//           type: String,
//           enum: ["Creative Commons", "Royalty-Free", "Copyrighted"],
//           default: "Copyrighted",
//         },
//         forSale: { type: Boolean, default: false },
//         price: { type: String, default: "" },
//         socialLinks: { type: String, trim: true },
//         portfolio: { type: String, trim: true },
//         createdAt: { type: Date, default: Date.now },
//       },
//       { timestamps: true }
// );

// module.exports = mongoose.model("Artwork", artworkSchema);



















// // const mongoose = require("mongoose");

// // const artworkSchema = new mongoose.Schema(
// //   {
// //     // Basic Artwork Details
// //     title: { type: String, required: true, trim: true },
// //     category: { type: [String], required: true }, // Example: ["Portrait", "Abstract"]
// //     tags: { type: [String], default: [] }, // SEO and Search Optimization
// //     shortDesc: { type: String, required: true, maxlength: 300 },
// //     fullDesc: { type: String, required: true },

// //     // File Details
// //     files: [
// //       {
// //         url: { type: String, required: true },
// //         fileName: { type: String, required: true },
// //         format: { type: String, required: true }, // Example: "JPEG", "PNG", "SVG"
// //         sizeInMB: { type: Number, required: true }, // File size for display
// //         dimensions: { width: Number, height: Number }, // Dimensions in pixels
// //       },
// //     ],
// //     coverImage: { type: String, required: true },

// //     // Ownership & Verification
// //     artistId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// //     artistUsername: { type: String, required: true },
// //     authorshipProof: { type: String, default: "" }, // Hash/Signature for proof of authenticity

// //     // Visibility & Licensing
// //     visibility: {
// //       type: String,
// //       enum: ["Public", "Private", "Followers Only"],
// //       default: "Public",
// //     },
// //     license: {
// //       type: String,
// //       enum: ["Creative Commons", "Royalty-Free", "Copyrighted"],
// //       default: "Copyrighted",
// //     },

// //     // AI-Generated (Optional Fields)
// //     aiGenerated: { type: Boolean, default: false },
// //     originalityScore: { type: Number, min: 0, max: 100, default: null }, // AI originality check

// //     // Pricing & Sales
// //     forSale: { type: Boolean, default: false },
// //     price: { type: Number, default: 0 },
// //     currency: { type: String, default: "USD" },
// //     discount: { type: Number, min: 0, max: 100, default: 0 }, // Discount percentage
// //     soldCount: { type: Number, default: 0 }, // Number of copies sold
// //     stock: { type: Number, default: null }, // If limited edition, specify stock count

// //     // Social & Engagement Metrics
// //     views: { type: Number, default: 0 },
// //     likes: { type: Number, default: 0 },
// //     shares: { type: Number, default: 0 },
// //     commentsCount: { type: Number, default: 0 },
// //     rating: { type: Number, min: 0, max: 5, default: 0 },
// //     reviewCount: { type: Number, default: 0 },
// //     comments: [
// //       {
// //         userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// //         username: { type: String },
// //         text: { type: String, required: true },
// //         createdAt: { type: Date, default: Date.now },
// //       },
// //     ],

// //     // External Links (Artist Portfolio & Social Media)
// //     socialLinks: { type: String, trim: true },
// //     portfolio: { type: String, trim: true },

// //     // SEO & Keywords
// //     keywords: { type: [String], default: [] }, // Search Optimization

// //     // Timestamps
// //     createdAt: { type: Date, default: Date.now },
// //     updatedAt: { type: Date, default: Date.now },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Artwork", artworkSchema);
