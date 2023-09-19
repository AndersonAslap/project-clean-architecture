import { Sequelize } from "sequelize-typescript"
import { RepositoryFactory } from "../../../src/application/factory/RepositoryFactory"
import { RepositoryDatabaseFactory } from "../../../src/infra/factory/RepositoryDatabaseFactory"
import { FindCustomerById } from "../../../src/application/use-cases/customer/FindCustomerById"
import { Customer } from "../../../src/domain/customer/entity/Customer"
import { randomUUID } from "crypto"
import { Address } from "../../../src/domain/customer/value-object/Address"
import { CustomerModel } from "../../../src/infra/repository/customer/database/sequelize/model/CustomerModel"
import { CustomerRepositoryDatabase } from "../../../src/infra/repository/customer/repository/sequelize/CustomerRepositoryDatabase"

let sequelize: Sequelize
let repositoryFactory: RepositoryFactory

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
        repositoryFactory = new RepositoryDatabaseFactory()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find a customer", async() => {
        const customer = new Customer(randomUUID(), "Aslap")
        const address = new Address('rua 48', 285, '50050-545', 'Pernambuco')
        customer.changeAddress(address)
        const customerRepository = new CustomerRepositoryDatabase()
        await customerRepository.save(customer);
        const useCase = new FindCustomerById(repositoryFactory)
        const output = await useCase.execute({id: customer._id})
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
})