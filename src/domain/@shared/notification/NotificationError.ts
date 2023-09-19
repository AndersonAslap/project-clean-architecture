import { INotificationError } from "./INotification";

export class NotificationError extends Error {
    
    constructor(readonly errors: INotificationError[]) {
        super(
            errors.map((error) => {
                return `${error.context}: ${error.message}`
            }).join(',')
        )
    }
}