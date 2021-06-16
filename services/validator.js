// *Import require modules
const { body } = require("express-validator");

// *Import models
const User = require("../models/User");

const registerValidator = [body("name").exists().withMessage("Name is required.").isAlpha("en-US", { ignore: " " }).withMessage("Invalid name").isLength({ min: 2, max: 20 }).withMessage("Name must be 2-20 characters.").trim(),
body("email").exists().withMessage("Email is required.").isEmail().withMessage("Invalid email format.").bail().custom(async (value) => {
    try {
        const user = await User.exists({ email: value });
        if (user) {
            return Promise.reject("Email already exists");
        } else {
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}).normalizeEmail(),
body("password").exists().withMessage("Password is required.").isStrongPassword().withMessage("Weak password"),
body("confirmPassword").exists().withMessage("Confirm password is required").custom((value,{req}) => {
    if (value === req.body.password)
        return true;
    else
        return false;
}).withMessage("Password doesn't match")
];

exports.registerValidator=registerValidator;