import { util } from '@aws-appsync/utils';

export function request(ctx) {
  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({ id: ctx.args.id}),
    update: {
      expression: 'SET ttl = :ttl',
      expressionValues: { ':ttl': { N: util.time.nowEpochMilliSeconds() + 36000 } },
    }
  }
}

export function response(ctx) {
  return ctx.result
}