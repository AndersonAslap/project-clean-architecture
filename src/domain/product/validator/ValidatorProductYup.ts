import * as yup from "yup";
import { IValidator } from "../../@shared/validator/IValidator";
import { Product } from "../entity/Product";

export class ValidatorProductYup implements IValidator<Product> {
    
    validate(entity: Product): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required("Id is required"),
                    name: yup.string().required("Name is required"),
                    price: yup.number().required("Price is required").moreThan(-1, 'Price should be able >= 0')
                })
                .validateSync(
                    {
                        id: entity._id,
                        name: entity._name,
                        price: entity._price
                    },
                    {
                        abortEarly: false
                    }
                )
        } catch (errors) {
            const e = errors as yup.ValidationError
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "product",
                    message: error
                })
            })
        }
    }
}