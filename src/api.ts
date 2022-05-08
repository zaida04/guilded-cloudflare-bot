import { Embed } from '@guildedjs/embeds';
import { RESTPostChannelMessagesResult, RESTPostChannelMessagesBody } from '@guildedjs/guilded-api-typings';
import { makeRequest } from './util';

export const API = {
    async sendMessage(channelId: string, content: string | Embed | RESTPostChannelMessagesBody) {
        await makeRequest<RESTPostChannelMessagesResult, RESTPostChannelMessagesBody>(
            `/channels/${channelId}/messages`,
            {
                method: 'POST',
                body:
                    typeof content === 'string'
                        ? { content }
                        : content instanceof Embed
                        ? { embeds: [content.toJSON()] }
                        : content,
            },
        );
    },
};
