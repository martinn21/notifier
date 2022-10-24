// import {IUser} from '@lambdas/user/Contract/IUser'

export class Notification {
    pk: string //compose notificationType#messageType
    timeDelivery: string
    user: Set<string>
    message: string
}