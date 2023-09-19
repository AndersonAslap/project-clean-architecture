import { NotificationError } from "../../@shared/notification/NotificationError"
import { EntityResources } from "../../@shared/resources/EntityResources"
import { ValidatorProductFactory } from "../factory/ValidatorFactory"
import { ProductInterface } from "./ProductInterface"

export class Product extends EntityResources implements ProductInterface {

    constructor(readonly id: string, private name: string, private price: number) {
        super()
        this.validated()
        if (this.notification.hasErrors()) throw new NotificationError(this.notification.allErrors())
    }

    get _id(): string {
        return this.id
    }

    get _name() {
        return this.name
    }

    get _price() {
        return this.price
    }

    changeName(name: string) {
        this.name = name
        this.validated()
        if (this.notification.hasErrors()) throw new NotificationError(this.notification.allErrors())
    }

    changePrice(price: number) {
        this.price = price
        this.validated()
        if (this.notification.hasErrors()) throw new NotificationError(this.notification.allErrors())
    }

    validated() {
        ValidatorProductFactory.create().validate(this)
    }
}