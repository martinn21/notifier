import {Container, Service} from 'typedi'
import {DataMapper, DynamoDbSchema, DynamoDbTable} from '@aws/dynamodb-data-mapper'
import {IUser} from '@lambdas/user/Contract/IUser'
import {User as UserModel} from '../Model/User'

@Service()
export class User {
    private mapper: DataMapper
    constructor() {
        this.mapper = Container.get(DataMapper)
        Object.defineProperties(UserModel.prototype, {
            [DynamoDbTable]: {
                value: process.env.USER_TABLE
            },
            [DynamoDbSchema]: {
                value: {
                    id: {
                        type: 'String',
                        keyType: 'HASH',
                    },
                    name: {
                        type: 'String',
                        keyType: 'RANGE'
                    },
                },
            },
        })
    }

    public async getAllUsers(): Promise<IUser[]> {
        let users = []
        const iterator = this.mapper.scan(UserModel)
        for await (const record of iterator) {
            console.log(record)
            users.push(record)
        }

        return users
    }
}