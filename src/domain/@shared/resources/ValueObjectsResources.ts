import { INotification } from "../notification/INotification"
import { Notification } from "../notification/Notification"

export abstract class ValueObjectsResources {

    protected notification: INotification

    constructor() {
        this.notification = new Notification()
    }
}