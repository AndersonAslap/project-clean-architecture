import { Product } from "../../../domain/product/entity/Product";
import ProductRepository from "../../../domain/product/repository/ProductRepository";
import { RepositoryFactory } from "../../factory/RepositoryFactory";
import { UseCase } from "../UseCase";

export class CreateProduct implements UseCase {
    
    produtRepository: ProductRepository

    constructor(repositoryFactory: RepositoryFactory){
        this.produtRepository = repositoryFactory.createProductRepository()
    }
    
    async execute(input: Input): Promise<void> {
        const product = new Product(input.id, input.name, input.price)
        await this.produtRepository.save(product)
    }
}

type Input = {
    id: string
    name: string
    price: number
}