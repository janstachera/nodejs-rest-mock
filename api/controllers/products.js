const mongoose = require('mongoose');
const Product = require('../models/product');

const ProductsController = {
    getAll: () => Product.find().limit(200).exec(),
    get: (id) => Product.findById(id).exec(),
    create: ({ name, price }) => {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name,
            price,
        });
        return product.save();
    },
    update: ({ id, body }) => {
        const updateOps = {};
        for (let ops of body) {
            updateOps[ops.propName] = ops.value;
        }
        return Product.update(
            { _id: id },
            { $set: updateOps },
        )
        .exec();
    },
    remove: (id) => Product.remove({ _id: id }).exec(),
};

module.exports = ProductsController;
