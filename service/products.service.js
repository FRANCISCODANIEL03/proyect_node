const { ProductRepository } = require("../repositories/product.repository");

class ProductService{
    async getAll(){
        return await ProductRepository.find();
    }

    async getOneBy(id){
        return await ProductRepository.findOneBy({id});
    }

    async create(product){
        const newProduct = ProductRepository.create(product);
        return await ProductRepository.save(newProduct);
    }

   
}

