import {DataMapper, DynamoDbSchema, DynamoDbTable, ScanIterator} from '@aws/dynamodb-data-mapper'
import {Container, Service} from 'typedi'
import {INotification} from '@lambdas/notification/src/Contract/INotification'
import {Notification as NotificationModel} from '../Model/Notification'
import {IUser} from '@lambdas/user/Contract/IUser'

@Service()
export class Notification {
    private mapper: DataMapper;
    constructor() {
        this.mapper = Container.get(DataMapper)
        Object.defineProperties(NotificationModel.prototype, {
            [DynamoDbTable]: {
                value: process.env.NOTIFICATION_TABLE
            },
            [DynamoDbSchema]: {
                value: {
                    pk: { //compose notificationType#category
                        type: 'String',
                        keyType: 'HASH',
                    },
                    timeDelivery: {
                        type: 'String',
                        keyType: 'RANGE'
                    },
                    message: {
                        type: 'String',
                    },
                    user: {
                        type: 'Set',
                        memberType: 'String'
                    }
                },
            },
        })
    }

    public async getAllNotifications(): Promise<INotification[]> {
        let notifications: INotification[] = []
        const iterator: ScanIterator<NotificationModel> = await this.mapper.scan(NotificationModel)
        for await (const record of iterator) {
            const user = {}
            record.user.forEach((item: string) => {
                const itemSet: string[] = item.split(':', 2)
                user[itemSet[0]] = itemSet[1]
            })
            const itemNotification: INotification = {
                ...record,
                user: user as IUser
            }
            notifications.push(itemNotification)
        }

        return notifications
    }

    public async save(notification: INotification): Promise<INotification> {
        const toSave = Object.assign(new NotificationModel, notification)
        const result = await this.mapper.put(toSave)
        console.log(result)

        return notification
    }
}