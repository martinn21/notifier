import {Container, Service} from 'typedi'
import {INotificationHttpVerb} from '@lambdas/notification/src/Contract/INotificationHttpVerb'
import {NotificationHttpVerbGet} from '@lambdas/notification/src/HttpVerb/NotificationHttpVerbGet'
import {NotificationHttpVerbPost} from '@lambdas/notification/src/HttpVerb/NotificationHttpVerbPost'

@Service()
export class FactoryNotificationHttpVerb {
    private httpVerbTypeClasses = {
        'get'   : Container.get(NotificationHttpVerbGet),
        'post'  : Container.get(NotificationHttpVerbPost)
    }

    public create(httpVerbType: string): INotificationHttpVerb {
        return this.httpVerbTypeClasses[httpVerbType.toLowerCase()]
    }

}