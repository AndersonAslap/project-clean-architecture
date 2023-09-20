import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../../../src/infra/repository/product/database/sequelize/model/ProductModel";
import { CreateProduct } from "../../../src/application/use-cases/product/CreateProduct";
import { Product } from "../../../src/domain/product/entity/Product";
import { randomUUID } from "crypto";

let sequelize: Sequelize
const idProduct = randomUUID()

const MockRepositoryFactory = {
    createCustomerRepository: jest.fn(),
    createProductRepository: () => {
        return {
            save: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findAll: jest.fn(),
        }
    },
    createOrderRepository: jest.fn(),
}

describe("CreateProductUseCase unit test", () => {
    let mockProductRepository: any;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: 'storage/:memoryProductRepository',
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([ProductModel])
        await sequelize.sync()
        mockProductRepository = MockRepositoryFactory.createProductRepository();
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {
        const usecase = new CreateProduct({
            ...MockRepositoryFactory,
            createProductRepository: jest.fn().mockReturnValue(mockProductRepository)
        });
        await usecase.execute({id: idProduct, name: 'product', price:10})
        expect(mockProductRepository.save).toHaveBeenCalledWith(new Product(idProduct, 'product', 10))
    })
})
