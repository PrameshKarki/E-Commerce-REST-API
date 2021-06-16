// *Express validation result
const { validationResult } = require("express-validator");

// *Import models
const User = require("../../models/User");

// *Import JWT Service
const JWTService=require("../../services/JWTService");

// *Import modules
const bcrypt = require("bcryptjs");

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
        try {
            const result = await User.create({
                name,
                email,
                password: hashedPassword
            });

            // *Token
            access_token=JWTService.sign({_id:result._id,role:result.role});

        } catch (err) {
            return next(err);
        }
        // *Return response
        res.json({access_token});
    } else {
        const err = {
            message: errors.array()[0].msg
        }
        return res.status(422).json(err);
    }

}