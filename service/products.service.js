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

    async update(id, data){
        await ProductRepository.update(id, data);
        return await ProductRepository.findOneBy({id});
    }

    async delete(id){
        return await ProductRepository.delete({id});
    }
}

