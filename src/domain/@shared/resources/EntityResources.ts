import { INotification } from "../notification/INotification"
import { Notification } from "../notification/Notification"

export abstract class EntityResources {

    readonly notification: INotification

    constructor() {
        this.notification = new Notification()
    }
}