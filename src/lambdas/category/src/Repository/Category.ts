import {DataMapper, DynamoDbSchema, DynamoDbTable} from '@aws/dynamodb-data-mapper'
import {Container, Service} from 'typedi'
import {ICategory} from '@lambdas/category/src/Contract/ICategory'
import {Category as CategoryModel} from '../Model/Category'

@Service()
export class Category {
    private mapper: DataMapper;

    constructor() {
        this.mapper = Container.get(DataMapper)
        Object.defineProperties(CategoryModel.prototype, {
            [DynamoDbTable]: {
                value: process.env.CATEGORY_TABLE
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

    public async getAllCategories(): Promise<ICategory[]> {
        let categories: ICategory[] = []
        const iterator = this.mapper.scan(CategoryModel)
        for await (const record of iterator) {
            const rec = { name: record.name }
            categories.push(rec)
        }

        return categories
    }
}