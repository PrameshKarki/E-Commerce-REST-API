// *Express validation result
const { validationResult } = require("express-validator");

// *Import models
const User = require("../../models/User");
const RefreshToken=require("../../models/RefreshToken");

// *Import JWT Service
const JWTService=require("../../services/JWTService");

// *Import modules
const bcrypt = require("bcryptjs");
const CustomErrorHandler = require("../../services/CustomErrorHandler");

// *Method for register
exports.postRegister = async (req, res, next) => {
    // TODO:
    // *Validate the request
    // *authorize the request
    // *Check if user is in the database or not
    // *Prepare model
    // *Store in database
    // *Generate JWT Token
    // *Send response

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        // * Logic begins here

        //* Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // *Prepare model
        const { name, email } = req.body;
        let access_token;
        let refresh_token;
        try {
            const result = await User.create({
                name,
                email,
                password: hashedPassword
            });

            // *Token
            access_token=JWTService.sign({_id:result._id,role:result.role});
            refresh_token=JWTService.sign({_id:result._id,role:result.role},"1y",process.env.REFRESH_TOKEN);

            // *Database WhiteList
            await RefreshToken.create({token:refresh_token});


        } catch (err) {
            return next(err);
        }
        // *Return response
        res.json({access_token,refresh_token});
    } else {
        const err = {
            message: errors.array()[0].msg
        }
        return res.status(422).json(err);
    }

}

// *Method for login
exports.postLogIn=async(req,res,next)=>{
    const errors = validationResult(req);
    let access_token,refresh_token;
    if(errors.isEmpty()){
        try{
            const user=await User.findOne({email:req.body.email});
            if(!user){
                return next(CustomErrorHandler.invalidCredentials());
            }

            // *Compare password
            const doMatch=await bcrypt.compare(req.body.password,user.password);
            if(doMatch){
                access_token=JWTService.sign({_id: user._id,role:user.role});
                refresh_token=JWTService.sign({_id: user._id,role:user.role},"1y",process.env.REFRESH_SECRET);

                // *Database Whitelist
                await RefreshToken.create({token:refresh_token});
            }else{
                return next(CustomErrorHandler.invalidCredentials());
            }

        }catch(err){
            return next(err);
        }
        return res.json({access_token,refresh_token});

    }else{
        const err = {
            message: errors.array()[0].msg
        }
        return res.status(422).json(err);
    }
}