const mongoose = require('mongoose');
const Product = require('../models/product');

const ProductsDao = {
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
        const updateProps = {};
        for (let key of Object.keys(body)) {
            updateProps[key] = body[key];
        }
        return Product.update(
            { _id: id },
            { $set: updateProps },
        ).exec();
    },
    remove: (id) => Product.remove({ _id: id }).exec(),
};

module.exports = ProductsDao;
