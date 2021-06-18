// *Import modules
const path=require("path");

const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

// *GLOBAL VARIABLE
global.appRoot=path.resolve(__dirname);

// *Import configuration
dotenv.config({path:"env/config.env"});

// *Import routes
const routes=require("./routes/routes");

// *Import middleware
const errorHandler=require("./middlewares/errorHandler");

// *Instantiate express app
const app=express();

// * Static Serving
app.use("/uploads",express.static("uploads"));

// * JSON body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// *Use routes
app.use("/api",routes);

// *Default error handling middleware
app.use(errorHandler);

// *Start server
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is listening on PORT:${process.env.PORT}`);
    })
})
