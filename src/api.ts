import { Embed } from '@guildedjs/embeds';
import { RESTPostChannelMessagesResult, RESTPostChannelMessagesBody } from '@guildedjs/guilded-api-typings';
import { RestManager } from '@guildedjs/rest';
const rest = new RestManager({ token: GUILDED_TOKEN });

export const API = {
    sendMessage: (channelId: string, content: string | Embed | RESTPostChannelMessagesBody) =>
        rest
            .post<RESTPostChannelMessagesResult, RESTPostChannelMessagesBody>(
                `/channels/${channelId}/messages`,
                typeof content === 'string'
                    ? { content }
                    : content instanceof Embed
                    ? { embeds: [content.toJSON()] }
                    : content,
            )
            .catch((e) => console.log(e.message)),
    rest,
};
