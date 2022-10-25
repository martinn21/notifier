export default {
    Category: {
        handler: 'src/lambdas/category/src/Category.handler',
        role: 'CategoryRole',
        memorySize: 1024,
        timeout: 30,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'category',
                    cors: true
                }
            }
        ]
    }
}