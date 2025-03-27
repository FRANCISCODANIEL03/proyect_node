const { ProductRepository } = require("../repositories/product.repository");

class ProductService{
    async getAll(){
        return await ProductRepository.find();
    }

    
}

