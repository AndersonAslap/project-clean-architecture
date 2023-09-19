import { CustomerRepository } from "../../../domain/customer/repository/CustomerRepository";
import { RepositoryFactory } from "../../factory/RepositoryFactory";
import { UseCase } from "../UseCase";

export class FindAllCustomer implements UseCase {

    private customerRepository: CustomerRepository

    constructor(repositoryFactory: RepositoryFactory){
        this.customerRepository = repositoryFactory.createCustomerRepository()
    }
    
    async execute(): Promise<Output> {
        const customers = await this.customerRepository.findAll()
        const output = customers.map(customer => ({
                id: customer._id,
                name: customer._name,
                address: {
                    street: customer?._address?.street,
                    number: customer?._address?.number,
                    zip: customer?._address?.zipcode,
                    state: customer?._address?.state
                }
        }))
        return output
    }
}

type Output = Array<
    {
        id: string
        name: string 
        address: {
            street: string,
            number: number,
            zip: string,
            state: string
        } 
    }
>
