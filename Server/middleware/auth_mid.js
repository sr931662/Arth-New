// const jwt = require("jsonwebtoken")

// const User = require("../DB/arthSchema")

// const authMiddleware = async (req, res, next) => {
//     const token = req.header("Authorization")

//     if (!token) {
//         return res.status(401).json({ message : "Unauthorized HTTP, Token not provided" })
//     }

//     const jwtToken = token.replace("Bearer", "").trim()

//     try {
//         const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY)
//         // console.log(isVerified)

//         const userData = await User.findOne({email: isVerified.email}).select({
//             pass: 0,
//             repass: 0,
//             tokens: 0
//         })
//         console.log(userData);

//         req.user = userData
//         req.token = token
//         req.userId = userData._id

//         next()

//     } catch (error) {
//         return res.status(401).json({ msg : "Unauthorized. Invalid Token"})
        
//     }
// }

// module.exports = authMiddleware

const jwt = require("jsonwebtoken");
const User = require("../DB/arthSchema");

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
        }

        const jwtToken = authHeader.replace("Bearer ", "").trim(); // Ensure proper token format
        const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);

        // Find user in DB
        const userData = await User.findOne({ email: isVerified.email }).select("-pass -repass -tokens");

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach user details to the request
        req.user = userData;
        req.token = jwtToken;
        req.userId = userData._id;

        next(); // Move to the next middleware

    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({ message: "Unauthorized. Invalid Token" });
    }
};

module.exports = authMiddleware;
