// * Import modules
const express=require("express");

// *Import router
const router=express.Router();

// *Import controllers
const authController=require("../controllers/auth/authController");
const userController=require("../controllers/userController");

// *Import middleware
const auth=require("../middlewares/auth");

// *Import validators
const validator=require("../services/validator");

router.post("/register",validator.registerValidator,authController.postRegister);

router.post("/login",validator.loginValidator,authController.postLogIn);

router.get("/me",auth,userController.getMe);

// *Export router
module.exports=router;