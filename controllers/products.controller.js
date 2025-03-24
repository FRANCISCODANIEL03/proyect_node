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

}


