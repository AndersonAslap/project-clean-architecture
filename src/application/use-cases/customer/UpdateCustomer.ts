import { Customer } from "../../../domain/customer/entity/Customer";
import { CustomerRepository } from "../../../domain/customer/repository/CustomerRepository";
import { Address } from "../../../domain/customer/value-object/Address";
import { RepositoryFactory } from "../../factory/RepositoryFactory";
import { UseCase } from "../UseCase";

export class UpdateCustomer implements UseCase {

    private customerRepository: CustomerRepository

    constructor(repositoryFactory: RepositoryFactory) {
        this.customerRepository = repositoryFactory.createCustomerRepository()
    }
    
    async execute(input: Input): Promise<void> {
        const customer = new Customer(input.id, input.name)
        if (input.address) {
            const address = new Address(input.address.street, input.address.number, input.address.zipcode, input.address.state)
            customer.changeAddress(address)
        }
        await this.customerRepository.update(customer)
    }
}

type Input = {
    id: string
    name: string 
    address?: {
        street: string,
        number: number,
        zipcode: string,
        state: string
    }
}