import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../../../src/infra/repository/product/database/sequelize/model/ProductModel";
import { CreateProduct } from "../../../src/application/use-cases/product/CreateProduct";
import { Product } from "../../../src/domain/product/entity/Product";
import { randomUUID } from "crypto";
import { FindProductById } from "../../../src/application/use-cases/product/FindProductById";

let sequelize: Sequelize
const product = new Product(randomUUID(), 'product', 10)

const MockRepositoryFactory = {
    createCustomerRepository: jest.fn(),
    createProductRepository: () => {
        return {
            save: jest.fn(),
            update: jest.fn(),
            find: jest.fn().mockReturnValue(product),
            findAll: jest.fn(),
        }
    },
    createOrderRepository: jest.fn(),
}

describe("FindProductByIdUseCase unit test", () => {
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

    it("should to find a product by id", async () => {
        const usecase = new FindProductById({
            ...MockRepositoryFactory,
            createProductRepository: jest.fn().mockReturnValue(mockProductRepository)
        });
        const product_ = await usecase.execute({id: product.id})
        expect(product_.id).toBe(product.id)
        expect(mockProductRepository.find).toHaveBeenCalled()
    })
})
