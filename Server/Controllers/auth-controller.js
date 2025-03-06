const User = require("../DB/arthSchema");
const Artwork = require("../DB/artworkSchema")
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config({ path:'../config.env' })


const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to Arth Home page");
    } catch (error) {
        console.log(error);
    }
};

// Multer Storage Configuration

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Ensure this directory exists
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });
// const upload = multer({ storage: storage });

// Upload Your Artwork
const uploadArtwork = async (req, res) => {
    try {
        const { title, category, shortDesc, fullDesc, visibility, license, forSale, price, socialLinks, portfolio } = req.body;
        const coverImage = req.file ? req.file.filename : null;  // For a single file (ensure frontend sends it)
        const files = req.files ? req.files.map((file) => ({
            filename: file.filename,
            path: `/uploads/${file.filename}` // Store the accessible path (for BLOB URL)
        })) : [];

        const newArtwork = new Artwork({
            title,
            category,
            shortDesc,
            fullDesc,
            coverImage,
            files,
            visibility,
            license,
            forSale,
            price,
            socialLinks,
            portfolio,
        });

        await newArtwork.save();

        res.status(201).json({
            msg: "Artwork uploaded successfully",
            artwork: newArtwork,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error uploading artwork", error: err.message });
    }
};







// const uploadArtwork = async (req, res) => {
//   try {
//     const { title, category, shortDesc, fullDesc, visibility, license, forSale, price, socialLinks, portfolio } = req.body;
//     const coverImage = req.file ? req.file.filename : "";
//     const files = req.files ? req.files.map((file) => file.filename) : [];

//     const newArtwork = new Artwork({
//         title,
//         category,
//         shortDesc,
//         fullDesc,
//         coverImage,
//         files,
//         visibility,
//         license,
//         forSale,
//         price,
//         socialLinks,
//         portfolio,
//     });

//     await newArtwork.save();

//     res.status(201).json({
//       msg: "Artwork uploaded successfully",
//       artwork: newArtwork,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "Error uploading artwork", error: err.message });
//   }
// };

  
// Register Page
const register = async (req, res) => {
    try {
        console.log(req.body);
        const { fname, lname, phone, email, pass, repass, role, bio } = req.body;

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const userCreated = await User.create({ fname, lname, phone, email, pass, repass, role, bio });
        res.status(201).json({
            msg: "Registration Successful",
            userId: userCreated,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ Message: err.message });
    }
};

// Login Page
const login = async (req, res) => {
    try {
        const { email, pass } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const user = await bcrypt.compare(pass, userExist.pass);

        if (user) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userID: userExist._id.toString(),
                fname: userExist.fname.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        console.log(err);
    }
};


// Get User Data (Protected Route)
const getUserInfo = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ msg: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
        const user = await User.findById(decoded.id).select("-pass");
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.status(200).json({ userInfo: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};
// const getUserInfo = async (req, res) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];

//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id).select("-pass");

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json({ userInfo: user });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

const userData = async (req, res) => {
    try {
        const userInfo = req.user;
        res.status(200).json({ userInfo });
    } catch (error) {
        console.log(`Error from the user route ${error}`);
    }
};

module.exports = { home, register, login, getUserInfo, userData, uploadArtwork, upload };



















































// const User = require("../DB/arthSchema")
// const bcrypt = require("bcryptjs")

// const home = async (req, res) => {
//     try {
//         res
//         .status(200)
//         .send(
//             "Welcome to Arth Home page"
//         )
//     } catch (error) {
//         console.log(error)
//     }
// }

// // Upload Your Artwork
// const uploadArtwork = async (req, res) => {
//     try {
//         console.log(req.body)
//         // const { title, category, shortDesc, fullDesc, coverImage } = req.body;

//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// // Register Page
// const register = async (req, res) => {
//     try {
//         console.log(req.body);
//         const { fname, lname, phone, email, pass, repass, role, bio } = req.body;

//         const userExists = await User.findOne({ email: email });

//         if (userExists) {
//             return res.status(400).json({ msg: "Email already exists" });
//         }

//         else {
//             const userCreated = await User.create({ fname, lname, phone, email, pass, repass, role, bio })
//             res.status(201).json({
//                 msg: "Registration Successful",
//             });
//         }
//         res.status(201).json({
//             msg: "Registration Successful",
//             userId: userCreated._id.toString(),
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ Message: err.message });
//     }
// };

// // Login Page
// const login = async (req, res) => {

//     try { 
//         const { email, pass } = req.body
//         const userExist = await User.findOne({ email })
//         // console.log(userExist)

//         if (!userExist) {
//             return res.status(400).json({ message : "Invalid Credentials" })
//         }

//         const user = await bcrypt.compare(pass, userExist.pass)

//         if (user) {
//             res.status(200).json({
//                 msg: "Login Successful",
//                 token: await userExist.generateToken(),
//                 userID: userExist._id.toString(),
//                 fname: userExist.fname.toString()
//             })
//         }
//         else {
//             res.status(401).json({ message : "Invalid email or password" })
//         }
//     }
//     catch (err) {
//         console.log(err)
//         // res.status(500).json({ message: err });/
//     }
// }


// const getUserInfo = async (req, res) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];

//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id).select("-pass");

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json({ userInfo: user });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// const userData = async (req, res) => {
//     try {
//         const userInfo = req.user
//         res.status(200).json({ userInfo })
//     } catch (error) {
//         console.log(`Error from the user route ${error}`)
//     }
// }

// module.exports = { home, register, login, getUserInfo, userData, uploadArtwork };
