import { NotificationError } from "../../@shared/notification/NotificationError"
import { ValueObjectsResources } from "../../@shared/resources/ValueObjectsResources"

export class Address extends ValueObjectsResources {
    
    constructor(readonly street: string, readonly number: number, readonly zipcode: string, readonly state: string) {
        super()
        this.validated()
        if (this.notification.hasErrors()) throw new NotificationError(this.notification.allErrors())
    }

    validated() {
        if (!this.street) this.notification.addError({context: 'Address', message: 'Street is required'}) 
        if (this.number <= 0) this.notification.addError({context: 'Address', message: 'Number is invalid'}) 
        if (!this.zipcode) this.notification.addError({context: 'Address', message: 'Zipcode is required'})
        if (!this.state) this.notification.addError({context: 'Address', message: 'State is required'})
    }
}