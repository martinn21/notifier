import {IChannel} from '@lambdas/notification/src/Contract/IChannel'
import {Notification as NotificationService} from '@lambdas/notification/src/Service/Notification'
import {Container} from 'typedi'
import {IUserCategories} from '@lambdas/user/Contract/IUserCategories'

export class  ChannelBase implements IChannel {
    private notificationService: NotificationService
    private readonly channelType: string;

    constructor(channelType: string) {
        this.notificationService = Container.get(NotificationService)
        this.channelType = channelType
    }

    public async send(user: IUserCategories, body: any): Promise<boolean> {
        await this.notificationService.save(user, body, this.channelType)
        return true
    }
}