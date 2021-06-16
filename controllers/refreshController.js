const { validationResult } = require("express-validator");
const RefreshToken = require("../models/RefreshToken");
const User = require("../models/User");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const JWTService = require("../services/JWTService");

exports.postRefresh = async (req, res, next) => {
    // *Check validation result
    const errors = validationResult(req);
    let userID,refreshToken,user;
    if (errors.isEmpty()) {
        // *Proceed further logic

        // *Verify valid refresh token or not
        try {
            let { _id } =await JWTService.verify(req.body.refresh_token,process.env.REFRESH_SECRET);
            userID = _id;

            try {
                // *Check the user is in database or not
                 user =await User.findById(_id);
                if (!user) {
                    return next(CustomErrorHandler.unauthorize("User not found!"));
                }
            } catch (error) {
                return next(error);
            }

        } catch (err) {
            return next(CustomErrorHandler.unauthorize());
        }

        // *Now Validate Token from the database
        try {
            refreshToken =await RefreshToken.findOne({ token: req.body.refresh_token });
            if (!refreshToken) {
                return next(CustomErrorHandler.unauthorize())
            }
        } catch (err) {
            return next(err);
        }

        // *If program is proceed here,all the criteria are fulfilled

        // !Generate new token and remove existing one
        let access_token=JWTService.sign({_id: user._id,role:user.role});
        let refresh_token=JWTService.sign({_id: user._id,role:user.role},"1y",process.env.REFRESH_SECRET);
       
        refreshToken.token=refresh_token;
        refreshToken.save();

        // *Send new tokens as a response 
        res.json({access_token,refresh_token});

    } else {
        const err = {
            message: errors.array()[0].msg
        }
        return res.status(422).json(err);
    }
}