const mongoose = require('mongoose');
const Order = require('../models/order');

const OrdersDao = {
    getAll: () => Order.find().limit(200).exec(),
    get: (id) => Order.findById(id).exec(),
    create: ({ productId, quantity }) => {
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            productId,
            quantity,
        });
        return order.save();
    },
    remove: (id) => Order.remove({ _id: id }).exec(),
};

module.exports = OrdersDao;
