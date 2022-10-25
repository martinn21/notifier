import {INotificationHttpVerb} from '@lambdas/notification/src/Contract/INotificationHttpVerb'
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import {Container, Service} from 'typedi'
import {User as UserService} from '@lambdas/user/Service/User'
import {IUserCategories} from '@lambdas/user/Contract/IUserCategories'
import {FactoryChannel} from '@lambdas/notification/src/Service/Channel/FactoryChannel'
import {IChannel} from '@lambdas/notification/src/Contract/IChannel'

@Service()
export class NotificationHttpVerbPost implements INotificationHttpVerb {
    public async execute(event?:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        const body = JSON.parse(event.body)
        const userService: UserService = Container.get(UserService)
        const factoryChannel: FactoryChannel = Container.get(FactoryChannel)
        const usersByCategory = await userService.getUserBySubscribedCategory('finance')
        usersByCategory.forEach((item: IUserCategories) => {
            const channels: [] = item.channel
            for (const channel of channels) {
                const channelClass: IChannel = factoryChannel.create(channel)
                channelClass.send(item, body)
            }
        })
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(usersByCategory)
        }
    }
}