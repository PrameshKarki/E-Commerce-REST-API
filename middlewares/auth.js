const CustomErrorHandler = require("../services/CustomErrorHandler");
const JWTService = require("../services/JWTService");

const auth=async(req,res,next)=>{

    // *Get Header
    let authHeader=req.headers.authorization;
    if(!authHeader){
        return next(CustomErrorHandler.unauthorize());
    }

    const access_token=authHeader.split(" ")[1];
    
    try {
        const {_id,role}=await JWTService.verify(access_token);
        req.user={
            _id,
            role
        }
        next();
    } catch (error) {
        return next(CustomErrorHandler.unauthorize());
    }
}

module.exports=auth;