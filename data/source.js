const { DataSource } = require("typeorm");
const { Product } = require("../models/Products");
const dotenv = require('dotenv');
dotenv.config()
require("reflect-metadata");

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    entities: [Product],
});

module.exports = { AppDataSource }
