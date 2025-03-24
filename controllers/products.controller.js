const { ProductService } = require("../service/products.service")
const { createProduct } = require("../functions/validate")

class ProductController {
    static async getAll(req, res) {
        try {
            const products = await ProductService.getAll();
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message || "Error interno al leer los datos" });
        }
    }
    static async getOneById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductService.getOneBy(id);
            if (!product) {
                return res.status(404).json({ message: "Producto no existente" });
            }
            if (!id || isNaN(id)) {
                return res.status(400).json({ message: "Ingresa in id valido" });
            }
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: error.message || "Error interno al leer los datos" });
        }
    }
    static async create(req, res) {
        try {
            const { nombre, precio, stock } = req.body;
            const data = { nombre, precio, stock };
            // Lista de campos permitidos
            const allowedFields = ["nombre", "precio", "stock"];
            const receivedFields = Object.keys(req.body);

            // Verificar si hay campos no permitidos
            const invalidFields = receivedFields.filter(field => !allowedFields.includes(field));
            if (invalidFields.length > 0) {
                return res.status(400).json({ message: `Campos no permitidos: ${invalidFields.join(", ")}` });
            }
            if (!createProduct(data)) {
                return res.status(400).json({ message: "Datos incorrectos o vacios" });
            }
            const product = await ProductService.create(data);
            return res.status(201).json({ message: "Producto creado exitosamente"});
        } catch (error) {
            return res.status(500).json({ message: error.message || "Error interno al crear el producto" });
        }
    }
}


