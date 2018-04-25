const mongoose = require('mongoose');
const Order = require('../models/order');
const { OrdersDao, ProductsDao } = require('../daos');


const OrdersService = {
    getAll: OrdersDao.getAll,
    get: OrdersDao.get,
    create: ({ productId, quantity }) => 
        ProductsDao.get(productId)
            .then((response) => 
                response
                    ? OrdersDao.create({ productId, quantity })
                    : Promise.reject({
                        code: 400,
                        msg: "No matching productId",
                    })
            )
            .catch((err) => Promise.reject(err)),
    remove: OrdersDao.remove,
};

module.exports = OrdersService;
