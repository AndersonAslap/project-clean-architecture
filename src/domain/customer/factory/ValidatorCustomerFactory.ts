import { IValidator } from "../../@shared/validator/IValidator";
import { Customer } from "../entity/Customer";
import { CustomerValidatorYup } from "../validator/ValidatorYup";

export class ValidatorCustomerFactory {
    static create(): IValidator<Customer> {
        return new CustomerValidatorYup()
    }
}