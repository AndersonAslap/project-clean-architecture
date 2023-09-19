import { Product } from "../../../domain/product/entity/Product";
import ProductRepository from "../../../domain/product/repository/ProductRepository";
import { RepositoryFactory } from "../../factory/RepositoryFactory";
import { UseCase } from "../UseCase";

export class UpdateProduct implements UseCase {
    
    productRepository: ProductRepository

    constructor(repositoryFactory: RepositoryFactory){
        this.productRepository = repositoryFactory.createProductRepository()
    }

    async execute(input: Input): Promise<void> {
        const produt = new Product(input.id, input.name, input.price)
        await this.productRepository.update(produt)
    }
}

type Input = {
    id: string
    name: string
    price: number
}