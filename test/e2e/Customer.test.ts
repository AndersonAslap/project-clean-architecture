import request from 'supertest'
import { Sequelize } from "sequelize-typescript"
import { CustomerModel } from "../../src/infra/repository/customer/database/sequelize/model/CustomerModel";
import { ExpressAdapter } from '../../src/infra/http/ExpressAdapter';
import { randomUUID } from 'crypto';
import { HttpController } from '../../src/infra/http/HttpController';
import { UseCaseFactory } from '../../src/infra/factory/UseCaseFactory';
import { RepositoryDatabaseFactory } from '../../src/infra/factory/RepositoryDatabaseFactory';

let sequelize: Sequelize
let server: any

describe("E2E test for customer", () => {

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryCustomerRepository',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([CustomerModel])
        await sequelize.sync()
        const httpServer = new ExpressAdapter()
        const repositoryFactory = new RepositoryDatabaseFactory()
        const useCaseFactory = new UseCaseFactory(repositoryFactory)
        new HttpController(httpServer, useCaseFactory)
        httpServer.listen((Math.floor(Math.random() * (4000 - 3000 + 1)) + 3000))
        server = httpServer.server
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a customer", async () => {
        const id = randomUUID()
        await request(server).post('/customer').send({
            id,
            name: 'Aslap', 
            address: {
                street: 'rua 48',
                number: 200,
                zipcode: '05024-021',
                state: 'Pernambuco'
            }
        })
        const output = await request(server).get(`/customer/${id}`)
        expect(output.body?.id).toBe(id)
        expect(output.body?.name).toBe('Aslap')
        expect(output.body?.address?.street).toBe('rua 48')
        expect(output.body?.address?.number).toBe(200)
        expect(output.body?.address?.zip).toBe('05024-021')
        expect(output.body?.address?.state).toBe('Pernambuco')
    })
})