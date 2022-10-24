import type { AWS } from '@serverless/typescript'
import DynamoDBTables from '@resources/dynamodb/Tables'
import CategoryLambda from '@lambdas/category/serverless/function'
import NotificationLambda from '@lambdas/notification/serverless/function'
import CategoryRole from '@lambdas/category/serverless/resource'
import NotificationRole from '@lambdas/notification/serverless/resource'

const serverlessConfiguration: AWS = {
  app: 'notifier',
  service: 'notifier',
  frameworkVersion: '3',
  custom: {
    region: '${opt:region, "us-west-1"}',
    stage: '${opt:stage, "dev"}',
    categoryTable: 'category-table-notifier-'+'${self:custom.stage}',
    notificationTable: 'notification-table-notifier-'+'${self:custom.stage}',
    userCategoriesTable: 'user-categories-table-notifier-'+'${self:custom.stage}',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-west-1',
    logRetentionInDays: 1,
    iam: {
      role: 'DefaultRole'
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    deploymentBucket: {
      name: 'serverless-deployment-bucket-account-'+'${aws:accountId}'+'-${aws:region}',
      serverSideEncryption: 'AES256'
    },
    environment: {
      REGION: '${self:custom.region}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      CATEGORY_TABLE: '${self:custom.categoryTable}',
      NOTIFICATION_TABLE: '${self:custom.notificationTable}',
      USER_CATEGORIES_TABLE: '${self:custom.userCategoriesTable}'
    },
  },
  plugins: [
      'serverless-esbuild',
      'serverless-deployment-bucket'
  ],
  functions: {
    ...CategoryLambda,
    ...NotificationLambda
  },
  resources: {
    Resources: {
      ...DynamoDBTables,
      ...CategoryRole,
      ...NotificationRole
    }
  },
  package: { individually: true },
};

module.exports = serverlessConfiguration;
