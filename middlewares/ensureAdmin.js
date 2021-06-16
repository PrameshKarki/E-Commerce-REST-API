const CustomErrorHandler = require("../services/CustomErrorHandler");

const ensureAdmin=(req,res,next)=>{
    if(req.user.role==="admin"){
        next();
    }else{
        return next(CustomErrorHandler.serverError());
    }
}

module.exports=ensureAdmin;