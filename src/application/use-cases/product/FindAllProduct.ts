import ProductRepository from "../../../domain/product/repository/ProductRepository";
import { RepositoryFactory } from "../../factory/RepositoryFactory";
import { UseCase } from "../UseCase";

export class FindAllProduct implements UseCase {
    
    productRepository: ProductRepository

    constructor(repositoryFactory: RepositoryFactory) {
        this.productRepository = repositoryFactory.createProductRepository()
    }

    async execute(): Promise<Output> {
        const proudcts = await this.productRepository.findAll()
        const output = proudcts.map((product) => (
            {
                id: product._id,
                name: product._name,
                price: product._price
            }
        ))
        return output
    }
}

type Output = Array<{
    id: string
    name: string
    price: number
}>