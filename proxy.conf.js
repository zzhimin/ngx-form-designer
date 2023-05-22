const forwardUrl = "http://10.0.5.104:32002";
const wsForwardUrl = "ws://10.0.5.104:32002";

const PROXY_CONFIG = {
  "/api": {
    target: forwardUrl,
    secure: false,
  }
};

module.exports = PROXY_CONFIG;
