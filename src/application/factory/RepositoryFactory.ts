import { OrderRepository } from "../../domain/checkout/repository/OrderRepository";
import { CustomerRepository } from "../../domain/customer/repository/CustomerRepository";
import ProductRepository from "../../domain/product/repository/ProductRepository";

export interface RepositoryFactory {
    createCustomerRepository(): CustomerRepository
    createProductRepository(): ProductRepository
    createOrderRepository(): OrderRepository
}