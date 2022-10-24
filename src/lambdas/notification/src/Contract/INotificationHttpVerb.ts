import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'

export interface INotificationHttpVerb {
    execute(event?: APIGatewayProxyEvent): Promise<APIGatewayProxyResult>
}