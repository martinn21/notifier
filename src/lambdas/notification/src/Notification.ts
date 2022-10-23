import 'reflect-metadata'
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import middy from '@middy/core'
import {INotification} from './Contract/INotification'
import {Container} from 'typedi'
import {DataMapper} from '@aws/dynamodb-data-mapper'
import {Notification as NotificationService} from '@lambdas/notification/src/service/Notification'
import * as AWS from 'aws-sdk'

const baseHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event)
    const client = new AWS.DynamoDB({region: process.env.REGION})
    Container.set(DataMapper, new DataMapper({client}))
    const notificationService: NotificationService = Container.get(NotificationService)
    const notifications: INotification[] = await notificationService.getAllNotifications()
    return {
        statusCode: 200,
        body: JSON.stringify(notifications)
    }
}

export const handler = middy(baseHandler)