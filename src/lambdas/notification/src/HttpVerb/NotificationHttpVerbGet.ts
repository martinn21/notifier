import {INotificationHttpVerb} from '@lambdas/notification/src/Contract/INotificationHttpVerb'
import {INotification} from '@lambdas/notification/src/Contract/INotification'
import {Notification as NotificationService} from '@lambdas/notification/src/Service/Notification'
import {Container, Service} from 'typedi'
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'

@Service()
export class NotificationHttpVerbGet implements INotificationHttpVerb {
    public async execute(event?: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        console.log(event)
        const notificationService: NotificationService = Container.get(NotificationService)
        const notifications: INotification[] = await notificationService.getAllNotifications()
        return {
            statusCode: 200,
            body: JSON.stringify(notifications)
        }
    }
}
