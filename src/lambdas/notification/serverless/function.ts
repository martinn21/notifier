export default {
    Notification: {
        handler: 'src/lambdas/notification/src/Notification.handler',
        role: 'NotificationRole',
        memorySize: 1024,
        timeout: 30,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'notification'
                }
            },
            {
                http: {
                    method: 'post',
                    path: 'notification'
                }
            },
        ]
    }
}