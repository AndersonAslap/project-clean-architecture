import * as yup from "yup";
import { IValidator } from "../../@shared/validator/IValidator";
import { Customer } from "../entity/Customer";

export class CustomerValidatorYup
  implements IValidator<Customer>
{
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
        })
        .validateSync(
          {
            id: entity._id,
            name: entity._name,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "customer",
          message: error,
        });
      });
    }
  }
}