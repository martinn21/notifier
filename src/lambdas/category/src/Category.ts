import 'reflect-metadata'
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import middy from '@middy/core'
import {ICategory} from './Contract/ICategory'
import {Container} from 'typedi'
import {DataMapper} from '@aws/dynamodb-data-mapper'
import {Category as CategoryService} from '@lambdas/category/src/service/Category'
import * as AWS from 'aws-sdk'

const baseHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event)
    const client = new AWS.DynamoDB({region: process.env.REGION})
    Container.set(DataMapper, new DataMapper({client}))
    const categoryService: CategoryService = Container.get(CategoryService)
    const categories: ICategory[] = await categoryService.getAllCategories()
    return {
        statusCode: 200,
        body: JSON.stringify(categories)
    }
}

export const handler = middy(baseHandler)