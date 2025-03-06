require("dotenv").config()
const express = require("express")
const app = express()
const router = require("./Route/auth-router")
const connectDB = require("./DB/db")
const cors = require("cors")

connectDB()

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};


app.use(cors(corsOptions))
app.use(express.json());
app.use("/api/auth", router)
app.use("/uploads", express.static("uploads")); // To serve images

// app.use("/api/artwork", artworkRouter); // Add artwork routes

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`)
})

