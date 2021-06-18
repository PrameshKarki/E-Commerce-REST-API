// *Import modules
const mongoose = require("mongoose");

// *Product Schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        get:(image)=>{
            return `${process.env.APP_URL}/${image}`;
        }
    }
    

},{timestamps:true,toJSON:{getters:true},id:false});

// *Export models
module.exports=mongoose.model("Product",productSchema);