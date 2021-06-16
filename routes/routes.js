// * Import modules
const express=require("express");

// *Import router
const router=express.Router();

// *Import controllers
const authController=require("../controllers/auth/authController");

// *Import validators
const validator=require("../services/validator");

router.post("/register",validator.registerValidator,authController.postRegister);

// *Export router
module.exports=router;