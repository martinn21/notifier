import AssumeRolePolicyDocument from '@resources/policy/AssumeRolePolicyDocument'
import LambdaLogs from '@resources/policy/LambdaLogs'

export default {
    DefaultRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
            RoleName: '${self:service}-${self:custom.region}-${self:custom.stage}-DefaultRole',
            AssumeRolePolicyDocument: AssumeRolePolicyDocument,
            ManagedPolicyArns: [
                'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
            ],
            Polices: [
                LambdaLogs
            ]
        }
    }
}