import {ICategory} from "@lambdas/category/src/Contract/ICategory";
import {INotificationType} from "@lambdas/notification/src/Contract/INotificationType";

export interface IUser{
    id: string
    name: string
    email: string
    phone_number: string
    Subscribed: ICategory[]
    Channels: INotificationType[]
}