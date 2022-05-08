/**
 * Utility function for making REST requests to the guilded API.
 * @returns A tuple containing the parsed JSON version of the response and the raw response itself
 */
export async function makeRequest<T = Record<string, any>, B = Record<string, any>>(
    route: string,
    { method, body }: { method: string; body: B },
): makeRequestResponseTuple<T> {
    // make the HTTP request
    const req = await fetch(`https://www.guilded.gg/api/v1${route}`, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GUILDED_TOKEN}` },
        body: JSON.stringify(body),
    });

    // If non 2xx status code, throw error
    if (!req.ok) {
        const parseErrorResponseBody = await req.json().catch(() => ({}));
        throw new GuildedAPIError((parseErrorResponseBody as any).message, method, route, req.status);
    }

    return [
        (await req
            .clone()
            .json()
            .catch(() => ({}))) as Promise<T>,
        req,
    ];
}

export class GuildedAPIError extends Error {
    public constructor(msg: string, public method: string, public path: string, public status: number) {
        super(`[GuildedAPIErr:${status}:${method.toUpperCase()}] ${path} - ${msg}`);
    }
}

export type makeRequestResponseTuple<T> = Promise<[Promise<T>, Response]>;
