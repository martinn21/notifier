import AssumeRolePolicyDocument from "@resources/policy/AssumeRolePolicyDocument";
import LambdaLogs from "@resources/policy/LambdaLogs";
import DynamoDBPolicy from "@resources/policy/DynamoDBPolicy";

export default {
    NotificationRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
            RoleName: '${self:service}-${self:custom.region}-${self:custom.stage}-NotificationRole',
            AssumeRolePolicyDocument: AssumeRolePolicyDocument,
            ManagedPolicyArns: [
                'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
            ],
            Policies: [
                {
                    ...LambdaLogs,
                    ...DynamoDBPolicy
                }
            ]
        }
    }
}