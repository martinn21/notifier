// import {
//     hashKey,
//     rangeKey,
//     table
// } from '@aws/dynamodb-data-mapper-annotations'

// @table(process.env.CATEGORY_TABLE)
export class Category {
    // @hashKey()
    id: string

    // @rangeKey()
    name: string
}