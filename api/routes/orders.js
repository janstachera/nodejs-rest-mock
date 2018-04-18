const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const OrdersController = require('../controllers/orders');

router.get('/', (req, res, next) => {
    OrdersController.getAll()
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
    OrdersController.create(req.body)
    .then((response) => {
        res.status(201).json({
            message: 'Order created',
        });
    })
    .catch((err) => {
        if (err === null) {
            res.status(500).json({
                error: 'Invalid productId',
            });
        } else {
            res.status(500).json({ error: err });
        }
    });
});

router.get('/:orderId', (req, res, next) => {
    OrdersController.get(req.params.orderId)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((err) => {
        res.status(500).json({error: err});
    });
});

router.delete('/:orderId', (req, res, next) => {
    OrdersController.remove(req.params.orderId)
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