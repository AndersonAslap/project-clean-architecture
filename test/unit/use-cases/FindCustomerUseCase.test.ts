import { FindCustomerById } from "../../../src/application/use-cases/customer/FindCustomerById"
import { Customer } from "../../../src/domain/customer/entity/Customer"
import { randomUUID } from "crypto"
import { Address } from "../../../src/domain/customer/value-object/Address"

const customer = new Customer(randomUUID(), "Aslap")
const address = new Address('rua 48', 285, '50050-545', 'Pernambuco')
customer.changeAddress(address)

const MockRepositoryFactory = () => {
    return {
        save: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
    }
}

describe("Test find customer use case", () => {

    it("should find a customer", async () => {

        const customerRepository = MockRepositoryFactory()

        const usecase = new FindCustomerById(customerRepository)

        const input = {
            id: '1'
        }

        const output = await usecase.execute(input)

        expect(output).toStrictEqual({
            id: customer._id,
            name: 'Aslap',
            address: {
                street: 'rua 48',
                number: 285,
                zip: '50050-545',
                state: 'Pernambuco'
            }
        })
    })

    it("should not find a customer", async () => {

        const customerRepository = MockRepositoryFactory()
        customerRepository.find.mockImplementation(() => {
            throw new Error('Customer not found')
        })

        const usecase = new FindCustomerById(customerRepository)

        const input = {
            id: '1'
        }

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow('Customer not found')

    })
})