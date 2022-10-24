import {Service} from 'typedi'
import {ChannelBase} from '@lambdas/notification/src/Service/Channel/ChannelBase'

@Service()
export class ChannelSMS extends ChannelBase{
    constructor() {
        super('sms')
    }
}