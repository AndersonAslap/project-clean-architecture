import { EntityResources } from "../../@shared/resources/EntityResources"
import { NotificationError } from "../../@shared/notification/NotificationError"
import { PublishedEventCustomerChangeAddressService } from "../services/PublishedEventCustomerChangeAddressService"
import { Address } from "../value-object/Address"
import { ValidatorCustomerFactory } from "../factory/ValidatorCustomerFactory"

export class Customer extends EntityResources {
    private address!: Address
    private active: boolean
    private rewardPoints: number

    constructor(readonly id: string, private name: string) {
        super()
        this.rewardPoints = 0
        this.active = false
        this.validate()
        if (this.notification.hasErrors()) throw new NotificationError(this.notification.allErrors())
    }

    get _id(): string {
        return this.id
    }

    get _name(): string {
        return this.name
    }

    get _address(): Address {
        return this.address
    }

    get _rewardsPoints(): number {
        return this.rewardPoints
    }

    increaseRewarsPoints(rewardsPoints: number) {
        if (rewardsPoints < 0) throw new Error("Rewards points is invalid")   
        this.rewardPoints += rewardsPoints
    }

    changeName(name: string) {
        this.name = name 
        this.validate()
        if (this.notification.hasErrors()) throw new NotificationError(this.notification.allErrors())
    }

    activate() {
        if (!this.address) throw new Error("Empty address")
        this.active = true
    }

    desactivate(){
        this.active = false
    }

    isActive() {
        return this.active
    }

    changeAddress(address: Address) {
        this.address = address
        const payload = {
            id: this._id,
            name: this._name,
            address
        }
        PublishedEventCustomerChangeAddressService.published(payload)
    }

    validate() {
        ValidatorCustomerFactory.create().validate(this)
    }
}