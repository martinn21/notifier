import {Container, Service} from 'typedi'
import {DataMapper, DynamoDbSchema, DynamoDbTable} from '@aws/dynamodb-data-mapper'
import {UserCategories as UserCategoriesModel} from '../Model/UserCategories'
import {IUserCategories} from '@lambdas/user/Contract/IUserCategories'

@Service()
export class UserCategories {
    private mapper: DataMapper
    constructor() {
        this.mapper = Container.get(DataMapper)
        Object.defineProperties(UserCategoriesModel.prototype, {
            [DynamoDbTable]: {
                value: process.env.USER_CATEGORIES_TABLE
            },
            [DynamoDbSchema]: {
                value: {
                    category: {
                        type: 'String',
                        keyType: 'HASH',
                    },
                    sk: { //compound by name#email
                        type: 'String',
                        keyType: 'RANGE',
                    },
                    phone_number: {
                        type: 'String'
                    },
                    channel: {
                        type: 'Set',
                        memberType: 'String'
                    }
                },
            },
        })
    }

    public async getAllUsers(): Promise<IUserCategories[]> {
        let users = []
        const iterator = this.mapper.scan(UserCategoriesModel)
        for await (const record of iterator) {
            users.push(record)
        }

        return users
    }

    public async getUserBySubscribedCategory(category: string): Promise<IUserCategories[]> {
        let usersByCategory: IUserCategories[] = []
        const iterator = this.mapper.query(
            UserCategoriesModel,
            {
                category: category
            }
        )
        for await (const record of iterator) {
            const channel = []
            record.channel.forEach((item: string) => {
                channel.push(item)
            })
            const userCategories: IUserCategories = {
                ...record,
                channel: channel
            }
            usersByCategory.push(userCategories)
        }

        return usersByCategory
    }
}