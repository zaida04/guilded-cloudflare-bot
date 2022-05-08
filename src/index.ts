import { Router } from '8track';
import { WSChatMessageCreatedPayload, WSEvent } from '@guildedjs/guilded-api-typings';
import { API } from './api';
import { makeRequest } from './util';
const router = new Router();

// All the different response types between this bot and the sending server
enum ResponseTypes {
    ALIVE = 0,
    PONG,
    RESPOND,
    FAILURE,
}

router.get`/`.handle((ctx) => {
    // root response
    ctx.json({ type: ResponseTypes.ALIVE });
});

/**
 * Handle events send to this bot
 */
router.post`/bot`.handle(async (ctx) => {
    // parse and extract body
    const { type, event, data }: { type: number; event: keyof WSEvent; data: WSChatMessageCreatedPayload['d'] } =
        await ctx.event.request.json();

    switch (type) {
        // PING requests, must respond in order to indicate to server that connection with ws should be kept alive
        case 0: {
            //  todo: pong
            break;
        }
        // Bot event requests
        case 1: {
            if (event !== 'ChatMessageCreated') return;

            // extract message
            const { message } = data;
            // if message created by bot, sent in dms, or doesn't start with prefix, do nothing
            if (
                message.createdByBotId ||
                message.createdBy === BOT_ID ||
                !message.serverId ||
                !message.content.startsWith(PREFIX)
            )
                return;

            // parse the message into the command name and args ("?test arg1 arg2 arg3" = [ "test", "arg1", "arg2", "arg3" ])
            let [commandName, ...args] = message.content.slice(PREFIX.length).trim().split(/ +/g);
            // if no command name (like a message with just a prefix in it only), don't do anything
            if (!commandName) return;
            commandName = commandName.toLowerCase();

            switch (commandName) {
                case 'test': {
                    // respond to the user
                    await API.sendMessage(message.channelId, 'Howdy there fella!');
                    break;
                }
                case 'say': {
                    await API.sendMessage(message.channelId, args.join(' '));
                    break;
                }
            }
            // if all is well, indicate to the server that everything is okay and that connection should be maintained.
            return ctx.json({ success: true, type: ResponseTypes.RESPOND });
        }
        default: {
            // if there is something wrong internally, respond the server so it knows to start keeping count and potentially get ready to sever the connection
            // so that it doesn't keep sending requests that will guarantee fail.
            return ctx.json({ type: ResponseTypes.FAILURE, success: false, data: { message: 'Invalid request.' } });
        }
    }
});

router.all`(.*)`.handle((ctx) =>
    // catch-all for non-handled routes
    ctx.json({ type: ResponseTypes.FAILURE, status: 404, data: { message: 'Route not found.' } }),
);

addEventListener('fetch', (e) => {
    // get route and run its respective "handle" function callback
    const res = router.getResponseForEvent(e).catch(
        (error) =>
            new Response(
                JSON.stringify({
                    type: ResponseTypes.FAILURE,
                    success: false,
                    data: { message: 'Internal error!' },
                }),
            ),
    );

    e.respondWith(res as any);
});
