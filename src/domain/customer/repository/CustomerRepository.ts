import { Customer } from "../entity/Customer";
import { Repository } from "../../@shared/repository/Repository";

export interface CustomerRepositoryInterface extends Repository<Customer> {
}