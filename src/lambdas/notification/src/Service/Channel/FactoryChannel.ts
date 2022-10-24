import {Container, Service} from 'typedi'
import {ChannelSMS} from '@lambdas/notification/src/Service/Channel/ChannelSMS'
import {ChannelPush} from '@lambdas/notification/src/Service/Channel/ChannelPush'
import {ChannelEmail} from '@lambdas/notification/src/Service/Channel/ChannelEmail'
import {IChannel} from '@lambdas/notification/src/Contract/IChannel'

@Service()
export class FactoryChannel {
    private channelTypeClasses = {
        'sms': Container.get(ChannelSMS),
        'push': Container.get(ChannelPush),
        'email': Container.get(ChannelEmail)
    }

    public create(channel: string): IChannel {
        return this.channelTypeClasses[channel.toLowerCase()]
    }
}