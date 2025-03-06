const { z } = require("zod");

// Creating an object schema
const signupSchema = z.object({
    fname: z
        .string({ required_error: "First name is required" })
        .trim()
        .min(3, { message: "First name must be at least of 3 characters" })
        .max(255, { message: "First name must not be more than 255 characters" }),
    lname: z
        .string({ required_error: "Last name is required" })
        .trim()
        .min(3, { message: "Last name must be at least of 3 characters" })
        .max(255, { message: "Last name must not be more than 255 characters" }),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 characters" })
        .max(20, { message: "Phone must not be more than 20 characters" }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
    pass: z
        .string({required_error: "Password is required"})
        .min(8, {message : "Password must be of at least 8 characters"})
        .max(1024, {message : "Password must not exceed 1024 characters"}),
    repass: z
        .string({required_error: "Password is required"})
        .min(8, {message : "Password must be of at least 8 characters"})
        .max(1024, {message : "Password must not exceed 1024 characters"})
})


module.exports = signupSchema