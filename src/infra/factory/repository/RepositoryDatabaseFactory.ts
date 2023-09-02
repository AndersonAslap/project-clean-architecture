import { RepositoryFactory } from "../../../application/factory/RepositoryFactory";
import { OrderRepository } from "../../../domain/checkout/repository/OrderRepository";
import { CustomerRepository } from "../../../domain/customer/repository/CustomerRepository";
import ProductRepository from "../../../domain/product/repository/ProductRepository";
import { OrderRepositoryDatabase } from "../../checkout/repository/sequelize/OrderRepositoryDatabase";
import { CustomerRepositoryDatabase } from "../../customer/repository/sequelize/CustomerRepositoryDatabase";
import { ProductRepositoryDatabase } from "../../product/repository/sequelize/ProductRepositoryDatabase";

export class RepositoryDatabaseFactory implements RepositoryFactory {
    
    createCustomerRepository(): CustomerRepository {
        return new CustomerRepositoryDatabase()
    }
    
    createProductRepository(): ProductRepository {
        return new ProductRepositoryDatabase()
    }
    
    createOrderRepository(): OrderRepository {
        return new OrderRepositoryDatabase()
    }
}