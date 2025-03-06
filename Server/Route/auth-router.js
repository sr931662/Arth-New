// *----------------------------
// * express.Router
// *----------------------------


//? In Express.js, express.Router() is a mini Express Application without all the server configuration but with the ability to define routes, middleware, and even have its own set of route handlers. It allows you to modularize your routes and middleware to keep your code organized and maintainable.
//* https://expressjs.com/en/guide/routing.html
//? Using the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".

const express = require("express")
const router = express.Router()
const authController = require("../Controllers/auth-controller")
const signupSchema = require("../middleware/zod_valid")
const authmid = require("../middleware/auth_mid")
const validate = require("../middleware/valid_mid")
const { upload } = require("../Controllers/auth-controller");

router.route("/").get(authController.home)

router.route("/register").post(validate(signupSchema), authController.register)

router.route("/login").post(authController.login)

router.route("/user").get(authmid, authController.userData)

router.post("/submitArtwork", upload.array("files", 500), authController.uploadArtwork); 

 
module.exports = router;