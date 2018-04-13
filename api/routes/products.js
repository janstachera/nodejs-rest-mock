const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product
        .find()
        .limit(200)
        .exec()
        .then((docs) => {
            res.status(200).json(docs);            
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product
        .save()
        .then((result) => {
            res.status(201).json({
                msg: 'Handling POST req to /products',
                createdProduct: product,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });    
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product
        .findById(id)
        .exec()
        .then((doc) => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "No matching id found",
                });
            }
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

router.patch('/:productId', (req, res, next) => {
    const updateOps = {};
    for (let ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product
        .update(
            { 
                _id: req.params.productId
            },
            {
                $set: updateOps,
            }
        )
        .exec()
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

router.delete('/:productId', (req, res, next) => {
    Product
        .remove({
            _id: req.params.productId
        })
        .exec()
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

module.exports = router;