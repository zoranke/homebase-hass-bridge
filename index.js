const hassServer = require('./bridge-hass');
const ssdpServer = require('./ssdp-server');
const ip = require('ip');
var cv = require('./const');

const PORT = cv.RHASS_PORT || 9999;
const IP = cv.RHASS_IP || ip.address();

// Start Bridge first
hassServer.start(PORT, (err, port) => {
  // then start the ssdp server to broad cast your servcie
  ssdpServer.start(`http://${IP}:${port}`);
  console.log(`ssdp server is on http://${IP}:${port}`);
});
