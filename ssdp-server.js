exports.start = function(location) {

  const Server = require('./lib/server');

  const server = new Server({
    udn: 'homeassistant',
    location: location,
    headers: {
      DEVICE_TYPE: 'bridge'
    }
  });

  server.addUSN('homebase:device');
  server.start();

  process.on('exit', function(){
    server.stop();
  });
};
