const mongoose = require('mongoose');
const Order = require('../models/order');
const ProductsController = require('./products');

const OrdersController = {
    getAll: () => Order.find().limit(200).exec(),
    get: (id) => Order.findById(id).exec(),
    create: ({ productId, quantity }) => {
        return ProductsController.get(productId)
        .then((response) => {
            if (response) {
                const order = new Order({
                    _id: new mongoose.Types.ObjectId(),
                    productId,
                    quantity,
                });
                return order.save();
            } else {
                return new Promise((resolve, reject) => {
                    reject(null);
                });
            }
        })
        .catch((err) => {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        });
    },
    remove: (id) => Order.remove({ _id: id }).exec(),
};

module.exports = OrdersController;
