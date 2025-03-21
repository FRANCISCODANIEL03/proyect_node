const productRoutes = require("./routes/products.routes");
const express = require('express');
const cors = require('cors');
const { AppDataSource } = require("./data/source");
const PORT = 3000;

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

