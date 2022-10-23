// import {IUser} from '@lambdas/user/Contract/IUser'

export interface INotification{
    pk: string //compose notificationType#messageType
    timeDelivery: string
    user: any
}