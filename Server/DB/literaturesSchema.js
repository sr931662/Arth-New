const mongoose = require("mongoose");

const literaturesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 150,
      trim: true,
      unique: true, // Ensure unique titles
      index: true, // Indexing for faster searches
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Tech", "Health", "Education", "Business", "Science", "Entertainment"],
      index: true,
    },
    tags: {
      type: [String], // Array of strings
      default: [],
      validate: [(tags) => tags.length <= 10, "Cannot have more than 10 tags"], // Limit tags
    },
    summary: {
      type: String,
      required: true,
    //   minlength: 100,
      maxlength: 500,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    //   minlength: 500, // Ensure detailed articles
    },
    document: {
      type: String, // File path or URL
      validate: {
        validator: function (v) {
          return !v || /^(https?:\/\/|\/uploads\/)/.test(v);
        },
        message: "Invalid document URL or file path",
      },
    },
    featureImage: {
      type: String, // File path or URL
    },
    seoMeta: {
      metaDescription: {
        type: String,
        maxlength: 160,
        trim: true,
      },
      keywords: {
        type: [String],
        validate: [(keywords) => keywords.length <= 10, "Cannot have more than 10 keywords"],
      },
    },
    author: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      bio: {
        type: String,
        maxlength: 300,
      },
      email: {
        type: String,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
        required: true,
      },
      profileImage: {
        type: String, // Profile picture URL or file path
      },
      socialLinks: {
        twitter: { type: String },
        linkedin: { type: String },
        github: { type: String },
        website: { type: String },
      },
    },
    stats: {
      wordCount: {
        type: Number,
        default: function () {
          return this.content ? this.content.split(" ").length : 0;
        },
      },
      readTime: {
        type: Number,
        default: function () {
          return Math.ceil(this.wordCount / 200); // Assuming 200 WPM reading speed
        },
      },
      sentimentScore: {
        type: Number,
        default: null, // AI-assisted analysis (range: -1 to 1)
      },
    },
    engagement: {
      likes: {
        type: Number,
        default: 0,
      },
      views: {
        type: Number,
        default: 0,
      },
      commentsCount: {
        type: Number,
        default: 0,
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Middleware: Update `updatedAt` field before saving
literaturesSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Indexing for better performance
literaturesSchema.index({ title: "text", summary: "text", tags: "text" });

const literature = mongoose.model("Literature", literaturesSchema);

module.exports = literature;
