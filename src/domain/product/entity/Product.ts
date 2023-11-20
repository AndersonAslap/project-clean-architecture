import { NotificationError } from "../../@shared/notification/NotificationError"
import { EntityResources } from "../../@shared/resources/EntityResources"
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

    private addError(message: string) {
        this.notification.addError({
            context: "product",
            message: message
        });
    }

    validated() {
        if (!this.id) this.addError("Id is required");
        if (!this.name) this.addError("Name is required");
        if (!this.id) this.addError("Id is required");
        if (this.price === undefined) this.addError("Price is required");
        if (this.price && this.price < 0) this.addError("Price should be able >= 0");
    }
}