const productRoutes = require("./routes/products.routes");
const express = require('express');
const cors = require('cors');
const { AppDataSource } = require("./data/source");
const PORT = 3000;

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//Rutas
app.use("/api/v1/prod", productRoutes);

AppDataSource.initialize().then(
    ()=>{
        console.log("Conectado a la base de datos");
        app.listen(PORT, () => console.log(`server running in http://localhost:${PORT}`));
    }
).catch(
    (err)=>{
        console.log("Error al conectar a la base de datos");
        console.error(err);
    }
);

