const CustomErrorHandler = require("../services/CustomErrorHandler");

let statusCode,data;

const errorHandler=(err,req,res,next)=>{
    statusCode=500;
    data={
        message:"Internal server error",
        ...(process.env.DEBUG_MODE==="true" && {originalError:err.message})
        
    }
    // ! You can pass validation error message from here too 

    if(err instanceof CustomErrorHandler){
        statusCode=err.status ;
        data={
            message:err.message
        }
    }

    return res.status(statusCode).json(data);
}


module.exports=errorHandler;