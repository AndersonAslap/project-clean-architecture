import { RepositoryFactory } from "../../application/factory/RepositoryFactory";
import { UseCase } from "../../application/use-cases/UseCase";
import { CreateCustomer } from "../../application/use-cases/customer/CreateCustomer";
import { FindAllCustomer } from "../../application/use-cases/customer/FindAllCustomer";
import { FindCustomerById } from "../../application/use-cases/customer/FindCustomerById";
import { UpdateCustomer } from "../../application/use-cases/customer/UpdateCustomer";
import { CreateProduct } from "../../application/use-cases/product/CreateProduct";
import { FindAllProduct } from "../../application/use-cases/product/FindAllProduct";
import { FindProductById } from "../../application/use-cases/product/FindProductById";
import { UpdateProduct } from "../../application/use-cases/product/UpdateProduct";

export class UseCaseFactory {

    constructor(readonly repositoryFactory: RepositoryFactory) {}

    createUseCaseCreateCustomer(): UseCase {
        return new CreateCustomer(this.repositoryFactory)
    }
    
    createUseCaseFindCustomerById(): UseCase {
        return new FindCustomerById(this.repositoryFactory)
    }
    
    createUseCaseFindAllCustomer(): UseCase {
        return new FindAllCustomer(this.repositoryFactory)
    }

    createUseCaseUpdateCustomer(): UseCase {
        return new UpdateCustomer(this.repositoryFactory)
    }

    createUseCaseFindAllProduct(): UseCase {
        return new FindAllProduct(this.repositoryFactory)
    }

    createUseCaseCreateProduct(): UseCase {
        return new CreateProduct(this.repositoryFactory)
    }

    createUseCaseFindProductById(): UseCase {
        return new FindProductById(this.repositoryFactory)
    }

    createUseCaseUpdateProduct(): UseCase {
        return new UpdateProduct(this.repositoryFactory)
    }
}