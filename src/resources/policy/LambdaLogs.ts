export default {
    PolicyName: 'PolicyLambdaLogs',
    PolicyDocument: {
        Version: '2012-10-17',
        Statement: [
            {
                Effect: 'Allow',
                Action: [
                    'logs:CreateLogGroup',
                    'logs:CreateLogStream',
                    'logs:PutLogEvents',
                ],
                Resource: [
                    {
                        'Fn::Join': [
                            ':',
                            [
                                'arn:aws:logs',
                                {'Ref': 'AWS::Region'},
                                {'Ref': 'AWS::AccountId'},
                                'log-group:/aws/lambda/${self:service}-${sls:stage}*:*'
                            ]
                        ]
                    }
                ]
            }
        ]
    }
}