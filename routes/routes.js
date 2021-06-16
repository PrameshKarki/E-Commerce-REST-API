// * Import modules
const path=require("path");

const express=require("express");

// *Import router
const router=express.Router();

// *Import controllers
const authController=require("../controllers/auth/authController");
const userController=require("../controllers/userController");
const refreshController=require("../controllers/refreshController");
const productController=require("../controllers/productController");

// *Import middleware
const auth=require("../middlewares/auth");
// *Import multer
const multer=require("multer");

// *Configure multer
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        const uniqueName=`${Date.now()}-${Math.random() * 1E9}${path.extname(file.originalname)}`
        cb(null,uniqueName);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/JPG") {
        cb(null, true);
    } else {
        cb("Invalid file format",false);
    }
}

const upload=multer({storage:storage,fileFilter:fileFilter,limits:{fileSize:1000000*5}}); //!5 mb


// *Import validators
const validator=require("../services/validator");
// *Custom error handler
const CustomErrorHandler = require("../services/CustomErrorHandler");

router.post("/register",validator.registerValidator,authController.postRegister);

router.post("/login",validator.loginValidator,authController.postLogIn);

router.get("/me",auth,userController.getMe);

router.post("/refresh",validator.refreshTokenValidator,refreshController.postRefresh);

router.post("/logout",auth,validator.refreshTokenValidator,authController.postLogOut);

router.post("/products",auth,(req,res,next)=>{
    const singleUpload=upload.single("image");
    singleUpload(req,res,next,(error)=>{
        if(error){
            return next(CustomErrorHandler.serverError());
        }
        next();
    })
},validator.productValidator,productController.postAddProduct);

// *Export router
module.exports=router;