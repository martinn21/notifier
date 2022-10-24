// import {ICategory} from '@lambdas/category/src/Contract/ICategory'
// import {INotificationType} from '@lambdas/notification/src/Contract/INotificationType'

export class User {
    id: string
    name: string
    email: string
    phone_number: string
    subscribed: Set<string>
    channels: Set<string>
}