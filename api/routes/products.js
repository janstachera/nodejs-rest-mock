const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ProductsService = require('../services/products');

router.get('/', (req, res, next) => {
    ProductsService.getAll()
        .then((docs) => {
            res.status(200).json(docs);            
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

router.post('/', (req, res, next) => {
    ProductsService.create({
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
    ProductsService.get(req.params.productId)    
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(err.code).json(err);
        });
});

router.patch('/:productId', (req, res, next) => {
    ProductsService.update({
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
    ProductsService.remove(req.params.productId)
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => {
            res.status(500).json({error: err});
        });
});

module.exports = router;