const hassServer = require('./bridge-hass');
const ssdpServer = require('./ssdp-server');
var cv = require('./const');

// Start Bridge first
hassServer.start(cv.RHASS_PORT, (err, port) => {
  // then start the ssdp server to broad cast your servcie
  ssdpServer.start(`http://${cv.RHASS_IP}:${cv.RHASS_PORT}`);
  console.log(`ssdp server is on http://${cv.RHASS_IP}:${cv.RHASS_PORT}`);
});
