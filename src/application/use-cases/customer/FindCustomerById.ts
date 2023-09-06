import { CustomerRepositoryInterface } from "../../../domain/customer/repository/CustomerRepository";
import { UseCase } from "../../factory/UseCase";

export class FindCustomerById implements UseCase {

    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: Input): Promise<Output> {
        const customer = await this.customerRepository.find(input.id)
        const output = {
            id: customer._id,
            name: customer._name,
            address: {
                street: customer?._address?.street,
                state: customer?._address?.state,
                number: customer?._address?.number,
                zip: customer?._address?.zipcode
            }
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
    address: {
        street: string
        state: string
        number: number
        zip: string
    }
}