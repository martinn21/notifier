import 'reflect-metadata'
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import middy from '@middy/core'
import {Container} from 'typedi'
import {DataMapper} from '@aws/dynamodb-data-mapper'
import * as AWS from 'aws-sdk'
import {FactoryNotificationHttpVerb} from '@lambdas/notification/src/HttpVerb/FactoryNotificationHttpVerb'
import {INotificationHttpVerb} from '@lambdas/notification/src/Contract/INotificationHttpVerb'

const baseHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const client = new AWS.DynamoDB({region: process.env.REGION})
    Container.set(DataMapper, new DataMapper({client}))
    const notificationHttpVerbFactory = Container.get(FactoryNotificationHttpVerb)
    const notificationHttpVerbClass: INotificationHttpVerb = notificationHttpVerbFactory.create(event.httpMethod)
    return await notificationHttpVerbClass.execute(event)
}

export const handler = middy(baseHandler)