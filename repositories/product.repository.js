const { AppDataSource } = require("../data/source");
const { Product } = require("../models/Products");

const ProductRepository = AppDataSource.getRepository(Product);

module.exports = {ProductRepository}
