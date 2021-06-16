// *Import models
const User = require("../models/User");

// *Import custom error handler
const CustomErrorHandler = require("../services/CustomErrorHandler");

exports.getMe=async(req,res,next)=>{
    try {
        const user=await User.findById(req.user._id).select("-password -updatedAt -__v");
        if(!user){
            return next(CustomErrorHandler.notFound());
        }
        res.json(user);
    } catch (error) {
        return next(error);
        
    }


}