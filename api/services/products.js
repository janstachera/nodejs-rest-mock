const mongoose = require('mongoose');
const ProductsDao = require('../daos/products');

const ProductsService = {
    getAll: () => ProductsDao.getAll(),
    get: (id) => ProductsDao.get(id)
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
    create: ProductsDao.create,
    update: (data) => ProductsDao.update(data),
    remove: (id) => ProductsDao.remove(id),
};

module.exports = ProductsService;
