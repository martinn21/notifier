import {INotification} from '@lambdas/notification/src/Contract/INotification'
import {Container, Service} from 'typedi'
import {Notification as NotificationRepository} from '../Repository/Notification'
import {IUserCategories} from '@lambdas/user/Contract/IUserCategories'

@Service()
export class Notification {
    private notificationRepository: NotificationRepository;

    constructor() {
        this.notificationRepository = Container.get(NotificationRepository)
    }

    public async getAllNotifications(): Promise<INotification[]> {
        return await this.notificationRepository.getAllNotifications()
    }

    public async save(user: IUserCategories, body, channelType: string): Promise<INotification> {
        const nameEmail = user.sk.split(':', 2)
        const userNotification: unknown = []
        userNotification[0] = `categories:[${user.category}]`
        userNotification[1] = `channels:[${user.channel}]`
        userNotification[2] = `name:${nameEmail[0]}`
        userNotification[3] = `email:${nameEmail[1]}`
        userNotification[3] = `phone_number:${user.phone_number}`
        const timeDelivery = new Date().toISOString()
        const notification: INotification = {
            pk: `${channelType}#${body.category}`,
            timeDelivery:timeDelivery,
            user: userNotification as Set<string>,
            message: body.message
        }

        return await this.notificationRepository.save(notification)
    }
}