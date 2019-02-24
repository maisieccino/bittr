const Router = require("koa-router");
const twilio = require("twilio");
const { getToken } = require("./twilio");
const User = require("./User");
const Message = require("./Message");

const router = new Router();

router.post("/token", async ctx => {
  // Register user in DB
  // Create twilio channel
  // Add to user DB
  const { identity, device } = ctx.request.body;
  const token = getToken(identity, device);
  const user = new User({ username: identity, device, token });
  // add user
  global.users = [...global.users.filter(x => x.username !== identity), user];
  console.log(global.users);
  ctx.response.body = {
    identity,
    token: token.toJwt(),
  };
  ctx.status = 200;
});

router.post("/sms", async ctx => {
  const res = new twilio.twiml.MessagingResponse();
  const username = global.users.length.toString(2);
  const user = new User({ username, device: "", token: "" });
  // add user
  global.users = [...global.users, user];
  res.message(`Your username is "${username}"`);
  ctx.status = 200;
  console.log(global.users);
  ctx.response.set("Content-Type", "text/xml");
  ctx.response.body = res.toString();
});

router.post("/send", async ctx => {
  const { from, to, msg } = ctx.request.body;
  const sender = global.users.filter(x => x.username === from);
  if (sender.length === 0) {
    ctx.throw("Can't find sender with this username", 404);
  }
  const user = [...global.users].filter(x => x.username === to);
  if (user.length === 0) {
    ctx.throw("Can't find user to send to", 404);
  }
  console.log(msg);
  if (msg !== "1" && msg !== "0") {
    ctx.throw(`Message must be a 0 or 1. Given: ${msg}`, 400);
  }
  const message = new Message({ from, to, message: msg, time: Date.now() });
  global.messages = [...global.messages, message];
  console.log(global.messages);
  ctx.response.body = { err: "" };
  ctx.status = 201;
});

router.get("/receive", async ctx => {
  const { user } = ctx.query;
  const query = global.users.filter(x => x.username === user.toString());
  console.log(user);
  console.log(query);
  if (query.length === 0) {
    ctx.throw("User not found", 404);
  }
  const messages = global.messages.filter(x => x.to === user);
  ctx.status = 200;
  ctx.response.body = messages;
});

module.exports = router;
