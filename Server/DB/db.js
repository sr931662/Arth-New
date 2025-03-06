const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const URI = `${process.env.MONGO_URI}Arth?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
        process.exit(1); // Exit with failure status
    }
};

module.exports = connectDB;
