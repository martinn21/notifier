export default {
    CategoryTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: '${self:provider.environment.CATEGORY_TABLE}',
            AttributeDefinitions: [
                {
                    'AttributeName': 'id',
                    'AttributeType' : 'S'
                },
                {
                    'AttributeName': 'name',
                    'AttributeType': 'S'
                }
            ],
            KeySchema: [
                {
                    'AttributeName': 'id',
                    'KeyType': 'HASH'
                },
                {
                    'AttributeName': 'name',
                    'KeyType': 'RANGE'
                }
            ],
            'ProvisionedThroughput': {
                'ReadCapacityUnits': '1',
                'WriteCapacityUnits': '1'
            }
        }
    },
    NotificationTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: '${self:provider.environment.NOTIFICATION_TABLE}',
            AttributeDefinitions: [
                {
                    'AttributeName': 'pk',
                    'AttributeType' : 'S'
                },
                {
                    'AttributeName': 'timeDelivery',
                    'AttributeType': 'S'
                }
            ],
            KeySchema: [
                {
                    'AttributeName': 'pk', //compose notificationType#messageType
                    'KeyType': 'HASH'
                },
                {
                    'AttributeName': 'timeDelivery',
                    'KeyType': 'RANGE'
                }
            ],
            'ProvisionedThroughput': {
                'ReadCapacityUnits': '1',
                'WriteCapacityUnits': '1'
            }
        }
    },
    UserCategoriesTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: '${self:provider.environment.USER_CATEGORIES_TABLE}',
            AttributeDefinitions: [
                {
                    'AttributeName': 'category',
                    'AttributeType' : 'S'
                },
                {
                    'AttributeName': 'sk', //compound field from name#email
                    'AttributeType': 'S'
                }
            ],
            KeySchema: [
                {
                    'AttributeName': 'category',
                    'KeyType': 'HASH'
                },
                {
                    'AttributeName': 'sk',
                    'KeyType': 'RANGE'
                }
            ],
            'ProvisionedThroughput': {
                'ReadCapacityUnits': '1',
                'WriteCapacityUnits': '1'
            }
        }
    },
}