const Router = require("koa-router");
const { getToken } = require("./twilio");

const router = new Router();

router.post("/signup", async ctx => {
  // Register user in DB
  // Create twilio channel
  const { identity, device } = ctx.request.body;
  const token = getToken(identity, device);
  ctx.response.body = {
    identity,
    token: token.toJwt(),
  };
});

module.exports = router;
