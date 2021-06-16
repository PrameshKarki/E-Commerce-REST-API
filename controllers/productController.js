// *Import modules
const path = require("path");
const fs = require("fs");

// *Import models
const Product = require("../models/Product");

// *Error Handler
const CustomErrorHandler = require("../services/CustomErrorHandler");

// *Validation result
const { validationResult } = require("express-validator");

exports.postAddProduct = async (req, res, next) => {
    // *Check validation
    const errors = validationResult(req);
    const file=req.file;
    if (errors.isEmpty()) {
        // TODO:Proceed further logic
        const body = JSON.parse(JSON.stringify(req.body));
        const { name, price, size } = body;
        let document;
        try {
            document = await Product.create({
                name,
                price,
                size,
                image: file.path
            })

        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }

        // *Send response back to the client
        res.status(201).json(document);

    } else {
        // ! If error occurs delete uploaded file
        fs.unlink(`${appRoot}/${file.path}`, (err => {
            if (err) {
                return next(CustomErrorHandler.serverError());
            }
        }))
        const err = {
            message: errors.array()[0].msg
        }
        return res.status(422).json(err);
    }

}

