const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const OrdersService = require('../services/orders');

router.get('/', (req, res, next) => {
    OrdersService.getAll()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });    
});

router.post('/', (req, res, next) => {
    OrdersService.create(req.body)
    .then((response) => {
        res.status(201).json({
            message: 'Order created',
        });
    })
    .catch((err) => {
        res.status(500).json({ error: err });
    });
});

router.get('/:orderId', (req, res, next) => {
    OrdersService.get(req.params.orderId)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((err) => {
        res.status(500).json({error: err});
    });
});

router.delete('/:orderId', (req, res, next) => {
    OrdersService.remove(req.params.orderId)
    .then((response) => {
        res.status(200).json({
            msg: 'Order deleted',
        });
    })
    .catch((err) => {
        res.status(500).json({ error: err, });
    })
});

module.exports = router;