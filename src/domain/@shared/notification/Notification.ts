import { INotification, INotificationError } from "./INotification";

export class Notification implements INotification {

    private errors: INotificationError[] = []

    addError(error: INotificationError): void {
        this.errors.push(error)
    }

    hasErrors(): boolean {
        return this.errors.length > 0
    }

    allErrors(): INotificationError[] {
        return this.errors
    }
}