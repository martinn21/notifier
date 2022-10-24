import {Service} from 'typedi'
import {ChannelBase} from '@lambdas/notification/src/Service/Channel/ChannelBase'

@Service()
export class ChannelPush extends ChannelBase {
    constructor() {
        super('push')
    }
}
