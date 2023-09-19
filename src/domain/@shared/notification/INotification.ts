export interface INotificationError {
    message: string
    context: string
}

export interface INotification {
    addError(error: INotificationError): void 
    hasErrors(): boolean
    allErrors(): Array<INotificationError>
}