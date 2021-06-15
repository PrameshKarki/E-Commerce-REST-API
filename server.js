// *Import modules
const path=require("path");

const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config({path:"env/config.env"});

// *Instantiate express app
const app=express();

// * Static Serving
app.use(express.static(path.join(__dirname,"public")));

// * JSON body parser
app.use(express.json());

// *Start server
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is listening on PORT:${process.env.PORT}`);
    })
})
