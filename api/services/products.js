const mongoose = require('mongoose');
const ProductsDao = require('../daos/products');

const ProductsService = {
    getAll: () => ProductDao.getAll(),
    get: (id) => ProductsDao.get(id)
        .catch((err) => {
            return Promise.reject({
                code: 500,
                msg: err,
            });
        })
        .then((response) => {
            if (response) {
                return Promise.resolve(response);
            } else {
                return Promise.reject({
                    code: 400,
                    msg: "No matching productId",
                });
            }
        }),
    create: (data) => ProductsDao.create(data),
    update: (data) => ProductsDao.update(data),
    remove: (id) => ProductsDao.remove(id),
};

module.exports = ProductsService;
