const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        msg: 'Handling GET req to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        msg: 'Handling POST req to /products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            msg: 'Special id found',
            id,
        });
    } else {
        res.status(200).json({
            msg: 'You passed normal id',
            id,
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        msg: 'Updated product',
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        msg: 'Deleted product',
    });
});

module.exports = router;