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
    const file = req.file;
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

exports.putUpdateProduct = async (req, res, next) => {
    // *Get productID from params
    const _id = req.params.productID;

    // *Get newly uploaded image is exist
    const file = req.file;

    // *Validation result
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        // TODO:Proceed further operation
        const { name, price, size } = JSON.parse(JSON.stringify(req.body));
        // *Fetch old product details
        const product = await Product.findById({ _id });
        if (product) {
            // *Check if there is new image or not,if there remove oldOne
            if (file) {
                fs.unlink(`${appRoot}/${product.image}`, err => {
                    if (err) {
                        return next(CustomErrorHandler.serverError());
                    }
                })
                product.image = file.path;
            }
            product.name = name;
            product.price = price;
            product.size = size;
            let status = await product.save();
            res.json(status);

        } else {
            return next(CustomErrorHandler.notFound("Product not found!"));
        }
    } else {
        if (file) {

            // !If there is a newly uploaded image,then remove it
            fs.unlink(`${appRoot}/${file.path}`, err => {
                if (err) {
                    return next(CustomErrorHandler.serverError());
                }


            })
        }
        const error = {
            message: errors.array()[0].msg
        }
        return res.status(422).json(error);
    }
}

