import { IValidator } from "../../@shared/validator/IValidator";
import { Product } from "../entity/Product";
import { ValidatorProductYup } from "../validator/ValidatorProductYup";

export class ValidatorProductFactory {
    static create() : IValidator<Product> {
        return new ValidatorProductYup()
    }
}