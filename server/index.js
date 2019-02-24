const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const router = require("./router");

global.users = [];
global.messages = [];

const app = new Koa();
app.use(logger());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

const { PORT: port } = process.env;

app.listen(port || 8080);
