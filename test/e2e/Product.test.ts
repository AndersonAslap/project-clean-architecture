import request from 'supertest'
import { Sequelize } from "sequelize-typescript"
import { ExpressAdapter } from '../../src/infra/http/ExpressAdapter';
import { randomUUID } from 'crypto';
import { HttpController } from '../../src/infra/http/HttpController';
import { UseCaseFactory } from '../../src/infra/factory/UseCaseFactory';
import { RepositoryDatabaseFactory } from '../../src/infra/factory/RepositoryDatabaseFactory';
import { ProductModel } from '../../src/infra/repository/product/database/sequelize/model/ProductModel';

let sequelize: Sequelize
let server: any

describe("E2E test for product", () => {

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryProductRepository',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([ProductModel])
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

    it("should create a product", async () => {
        const id = randomUUID()
        await request(server).post('/product').send({
            id,
            name: 'Product', 
            price: 1000
        })
        const output = await request(server).get(`/product/${id}`)
        expect(output.body?.id).toBe(id)
        expect(output.body?.name).toBe('Product')
        expect(output.body?.price).toBe(1000)
    })

    it("should find all products", async () => {
        const [idProduct1, idProduct2] = [randomUUID(), randomUUID()];
        await request(server).post('/product').send({
            id:idProduct1,
            name: 'Product - 01', 
            price: 1000
        })
        await request(server).post('/product').send({
            id:idProduct2,
            name: 'Product - 02', 
            price: 1000
        })
        const output = await request(server).get(`/products`)
        expect(output.body?.length).toBe(2)
        expect(output.body?.[0].name).toBe('Product - 01')
        expect(output.body?.[1].name).toBe('Product - 02')
    })

    it("should update a product", async () => {
        const id = randomUUID()
        await request(server).post('/product').send({
            id,
            name: 'Product - 01', 
            price: 1000
        })
        await request(server).put(`/product`).send({
            id,
            name: 'Product - update', 
            price: 105
        })
        const output = await request(server).get(`/product/${id}`)
        expect(output.body?.id).toBe(id)
        expect(output.body?.name).toBe('Product - update')
        expect(output.body?.price).toBe(105)
    })
})