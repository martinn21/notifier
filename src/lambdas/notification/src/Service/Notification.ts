import {INotification} from '@lambdas/notification/src/Contract/INotification'
import {Container, Service} from 'typedi'
import {Notification as NotificationRepository} from '../Repository/Notification'

@Service()
export class Notification {
    private notificationRepository: NotificationRepository;

    constructor() {
        this.notificationRepository = Container.get(NotificationRepository)
    }

    public async getAllNotifications(): Promise<INotification[]> {
        return await this.notificationRepository.getAllNotifications()
    }
}