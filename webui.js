const configuration = require('./configuration.js')
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => { ctx.body = "Hello World by koa-router" });
router.get('/db', (ctx, next) => { ctx.body = "db called with \"" + JSON.stringify(ctx.request) + "\"" });

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(configuration.webuiPort);
console.info("now listening on http://localhost:" + configuration.webuiPort + "/");
console.info("you can also use http://localhost:" + configuration.webuiPort + "/db");
