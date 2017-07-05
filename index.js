const hassServer = require('./bridge-hass');
const ssdpServer = require('./ssdp-server');
const ip = require('ip');
const PORT = 9999;

// Start Bridge first
hassServer.start(PORT, (err, port) => {
  // then start the ssdp server to broad cast your servcie
  ssdpServer.start(`http://${ip.address()}:${port}`);
});
