const hassServer = require('./bridge-hass');
const ssdpServer = require('./ssdp-server');
const ip = require('ip');
const PORT = 9999;
const HASS_IP = "192.168.1.198";

// Start Bridge first
hassServer.start(PORT, HASS_IP, (err, port) => {
  // then start the ssdp server to broad cast your servcie
  ssdpServer.start(`http://${ip.address()}:${port}`);
});
