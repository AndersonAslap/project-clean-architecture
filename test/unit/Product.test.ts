import { randomUUID } from 'crypto'
import { Product } from '../../src/domain/product/entity/Product'

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() => new Product("", "Product 1", 1)).toThrowError("product: Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() => new Product(randomUUID(), "", 1)).toThrowError("product: Name is required")
    })

    it("should throw error when price is invalid", () => {
        expect(() => new Product(randomUUID(), "Product 1", -1)).toThrowError("product: Price should be able >= 0")
    })

    it("should created a product", () => {
        const product = new Product(randomUUID(), "Product 1", 1)
        expect(product).toBeDefined()
    })

    it("should change name", () => {
        const product = new Product(randomUUID(), "Product 1", 1)
        product.changeName("Product 2")
        expect(product._name).toBe("Product 2")
    })

    it("should throw error when change name with name empty", () => {
        const product = new Product(randomUUID(), "Product 1", 1)
        expect(() => {
            product.changeName("")
        }).toThrowError("product: Name is required")
    })

    it("should change price", () => {
        const product = new Product(randomUUID(), "Product 1", 1)
        product.changePrice(2)
        expect(product._price).toBe(2)
    })

    it("should throw error when change price with price incorrect", () => {
        const product = new Product(randomUUID(), "Product 1", 1)
        expect(() => {
            product.changePrice(-20)
        }).toThrowError("product: Price should be able >= 0")
    })
})