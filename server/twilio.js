const twilio = require("twilio");

const { AccessToken } = twilio.jwt;
const { ChatGrant } = AccessToken;

const getToken = (identity, deviceId) => {
  const endpointId = `bittr:${identity}:${deviceId}`;
  const chatGrant = new ChatGrant({
    serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
    endpointId,
  });
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
  );
  token.addGrant(chatGrant);
  token.identity = identity;
  return token;
};

module.exports = { getToken };
