import {Service} from 'typedi'
import {ChannelBase} from '@lambdas/notification/src/Service/Channel/ChannelBase'

@Service()
export class ChannelEmail extends ChannelBase {
    constructor() {
        super('email')
    }
}
