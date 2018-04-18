const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ProductsController = require('../controllers/products');

router.get('/', (req, res, next) => {
    ProductsController.getAll()
        .then((docs) => {
            res.status(200).json(docs);            
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

router.post('/', (req, res, next) => {
    ProductsController.create({
            name: req.body.name, 
            price: req.body.price,
        })
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
    ProductsController.get(req.params.productId)    
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
    ProductsController.update({
        id: req.params.productId,
        body: req.body,
    })
    .then((doc) => {
        res.status(200).json(doc);
    })
    .catch((err) => {
        res.status(500).json({error: err});
    });
});

router.delete('/:productId', (req, res, next) => {
    ProductsController.remove(req.params.productId)
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

module.exports = router;