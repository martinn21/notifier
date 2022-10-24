export default {
    PolicyName: 'DynamoDBPolicy',
    PolicyDocument: {
        Version: '2012-10-17',
        Statement: [
            {
                Effect: "Allow",
                Action: [
                    "dynamodb:BatchGetItem",
                    "dynamodb:GetItem",
                    "dynamodb:Query",
                    "dynamodb:Scan",
                    "dynamodb:BatchWriteItem",
                    "dynamodb:PutItem",
                    "dynamodb:UpdateItem"
                ],
                Resource: [
                    {
                        'Fn::Join': [
                            ':',
                            [
                                'arn:aws:dynamodb',
                                {'Ref': 'AWS::Region'},
                                {'Ref': 'AWS::AccountId'},
                                //'table/' + {"Fn::GetAtt": ['${self:custom.categoryTable}', 'Arn']}
                                'table/category-table-notifier-${self:custom.stage}'
                            ]
                        ]
                    },
                    {
                        'Fn::Join': [
                            ':',
                            [
                                'arn:aws:dynamodb',
                                {'Ref': 'AWS::Region'},
                                {'Ref': 'AWS::AccountId'},
                                'table/notification-table-notifier-${self:custom.stage}'
                            ]
                        ]
                    },
                    {
                        'Fn::Join': [
                            ':',
                            [
                                'arn:aws:dynamodb',
                                {'Ref': 'AWS::Region'},
                                {'Ref': 'AWS::AccountId'},
                                'table/user-categories-table-notifier-${self:custom.stage}'
                            ]
                        ]
                    }
                ]
            }
        ]
    }
}