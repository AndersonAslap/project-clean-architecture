import ProductRepository from "../../../domain/product/repository/ProductRepository";
import { RepositoryFactory } from "../../factory/RepositoryFactory";
import { UseCase } from "../UseCase";

export class FindProductById implements UseCase {
    
    productRepository: ProductRepository

    constructor(repositoryFactory: RepositoryFactory){
        this.productRepository = repositoryFactory.createProductRepository()
    }

    async execute(input: Input): Promise<Output> {
        const product = await this.productRepository.find(input.id)
        const output = {
            id: product._id,
            name: product._name,
            price: product._price
        }
        return output
    }
}

type Input = {
    id: string
}

type Output = {
    id: string
    name: string
    price: number
}