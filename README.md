# guilded-cloudflare-bot

A template for creating serverless Guilded bots.

# 🚧 Getting Started

## ENV variables

Please supply the following ENV variables in either the `wrangler.toml` file or through the Cloudflare Dashboard

| Key           | Description                                                        |
| ------------- | ------------------------------------------------------------------ |
| GUILDED_TOKEN | Token belonging to your Guilded bot                                |
| PREFIX        | Prefix that is required for messages to start with                 |
| BOT_ID        | ID of your bot                                                     |
| NONCE         | Nonce already provided to our backend to verify events are from us |

## Setup

```
git clone https://github.com/yoki-labs/guilded-cloudflare-bot.git bot
cd bot
npm install
npm run build
```

You can locally test this worker by running `npm run dev`, or by deploying it using `wrangler publish`
Be sure to fill in the env variables as seen [here](#env-variables)

## LICENSE

This license can also be found [here](https://github.com/yoki-labs/guilded-cloudflare-bot/blob/main/LICENSE)

```
MIT License

Copyright (c) 2022 Yoki Labs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
