import {IUserCategories} from "@lambdas/user/Contract/IUserCategories";

export interface IChannel {
    send(user: IUserCategories, body: any): Promise<boolean>
}