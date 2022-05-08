import type { Context } from '8track';

// declare our worker variables as global variables
declare global {
    const NONCE: string;
    const BOT_ID: string;
    const PREFIX: string;
    const GUILDED_TOKEN: string;
}

export type EContext = Context<
    any,
    {
        [x: string]: string;
    }
>;
