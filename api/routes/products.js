const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ProductsService = require('../services/products');
const { handleError } = require('../utils/error');

router.get('/', (req, res, next) => {
    ProductsService.getAll()
        .then((docs) => {
            res.status(200).json(docs);            
        })
        .catch((error) => {
            handleError({ res, error });
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
        .catch((error) => {
            handleError({ res, error });
        });    
});

router.get('/:productId', (req, res, next) => {
    ProductsService.get(req.params.productId)    
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            handleError({ res, error });
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
    .catch((error) => {
        handleError({ res, error });
    });
});

router.delete('/:productId', (req, res, next) => {
    ProductsService.remove(req.params.productId)
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((error) => {
            handleError({ res, error });
        });
});

module.exports = router;