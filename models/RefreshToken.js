// * Import modules
const mongoose=require("mongoose");

// *Define Schema
const refreshTokenSchema=mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    }
})

// *Export model
module.exports=mongoose.model("RefreshToken",refreshTokenSchema);