// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import Koa, { Context } from 'koa';
import got from 'got';
import cors from '@koa/cors';
import router from 'koa-joi-router';
import logger from 'koa-logger';

const { ANILIST_ID, ANILIST_SECRET } = process.env;

const app = new Koa();
const r = router();

app.use(cors());
app.use(logger());

r.get('/', async (ctx: Context) => {
    ctx.body = { hello: 'world' };
});

r.post('/oauth', { validate: { type: 'json' } }, async (ctx: Context) => {
    try {
        const { code } = ctx.request.body;

        const { body } = await got.post(
            'https://anilist.co/api/v2/oauth/token',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                json: {
                    grant_type: 'authorization_code',
                    client_id: ANILIST_ID,
                    client_secret: ANILIST_SECRET,
                    redirect_uri: 'http://localhost:3000/anilist', // http://example.com/callback
                    code, // The Authorization Code received previously
                },
                responseType: 'json',
            },
        );

        ctx.body = body;
    } catch (err) {
        ctx.status = 400;
        ctx.body = err.message;
    }
});

app.use(r.middleware());

app.listen(3001, () => {
    console.log('server running at 3001...');
});
