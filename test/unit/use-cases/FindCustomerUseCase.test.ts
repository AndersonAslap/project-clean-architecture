import { Sequelize } from "sequelize-typescript"
import { CustomerModel } from '../../../src/infra/customer/database/sequelize/model/CustomerModel'
import { FindCustomerById } from "../../../src/application/use-cases/customer/FindCustomerById"
import { Customer } from "../../../src/domain/customer/entity/Customer"
import { randomUUID } from "crypto"
import { Address } from "../../../src/domain/customer/value-object/Address"

let sequelize: Sequelize

const customer = new Customer(randomUUID(), "Aslap")
const address = new Address('rua 48', 285, '50050-545', 'Pernambuco')
customer.changeAddress(address)

const MockRepositoryFactory = {
    createCustomerRepository: () => {
        return {
            save: jest.fn(),
            update: jest.fn(),
            find: jest.fn().mockReturnValue(Promise.resolve(customer)),
            findAll: jest.fn(),
        }
    },
    createProductRepository: jest.fn(),
    createOrderRepository: jest.fn(),
}

describe("Test find customer use case", () => {
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryCustomerRepository',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find a customer", async() => {
        const usecase = new FindCustomerById(MockRepositoryFactory)
        const output = await usecase.execute({id: customer._id})
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

    it("should not find a customer", async() => {
        const mockRepositoryFactory = MockRepositoryFactory;
        mockRepositoryFactory.createCustomerRepository().find.mockRejectedValue(new Error('Customer not found'))
        const usecase = new FindCustomerById(mockRepositoryFactory)
        await expect(usecase.execute({ id: customer._id })).rejects.toThrow('Customer not found');
    })
})