import { Customer } from "../../../../domain/customer/entity/Customer";
import { CustomerRepository } from "../../../../domain/customer/repository/CustomerRepository";
import { Address } from "../../../../domain/customer/value-object/Address";
import { CustomerModel } from "../../database/sequelize/model/CustomerModel";

export class CustomerRepositoryDatabase implements CustomerRepository {

    async save(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity._id,
            name: entity._name,
            street: entity._address?.street || null,
            state: entity._address?.state || null,
            number: entity._address?.number || null,
            zipcode: entity._address?.zipcode || null
        });
    }

    async update(entity: Customer): Promise<void> {
        if (entity._address) {
            await CustomerModel.update({
                name: entity._name,
                street: entity._address?.street || null,
                state: entity._address?.state || null,
                number: entity._address?.number || null,
                zipcode: entity._address?.zipcode || null
            }, {
                where: { id: entity._id }
            })
        } else {
            await CustomerModel.update({
                name: entity._name
            }, {
                where: { id: entity._id }
            })
        }
    }

    async find(id: string): Promise<Customer> {
        const customerData = await CustomerModel.findOne({where: {id}})
        if (!customerData) throw new Error('Customer not found!') 
        const customer = new Customer(customerData.id, customerData.name)
        if (customerData.street) customer.changeAddress(new Address(customerData.street, customerData.number, customerData.zipcode, customerData.state))
        return customer
    }

    async findAll(): Promise<Customer[]> {
        const customerData = await CustomerModel.findAll()
        return customerData.map((customer) => new Customer(customer.id, customer.name))
    }
}