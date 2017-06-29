const exec = require('child_process').exec;

//mock devices
const devices = [];
for(let i = 0; i< 30; i++) {
  devices.push({
    name: 'Device' + i,
    deviceId: i.toString(),
    actions: {
      switch: ['on', 'off']
    },
    state: {
      switch: null
    },
    type: 'light'
  })
}

exports.start = function(PORT, HASS_ADDRESS, cb) {
  // jayson is json-rpc server
  const jayson = require('jayson');

  var hass_base_opt = {
    hostname: HASS_ADDRESS,
    port: 8123,
    path: '/api',
    headers: {
      'Content-Type':'application/json',
    }
  };

  const server = jayson.server({
    list: function(args, callback) {
      var http= require('http');

      console.log(JSON.stringify(args, null, 4));
      const hass_passwd = args.userAuth.userToken;
      console.log(hass_passwd);

      hass_base_opt.path += "/states";
      hass_base_opt.method = "GET";
      hass_base_opt.headers['x-ha-access'] = hass_passwd;
      console.log(hass_base_opt);
      const req = http.request(hass_base_opt, function (res) {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          console.log('No more data in response.');
        });
      });
      req.setTimeout(5000);
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
      req.end();
      callback(null, devices);
    },
    get: function(args, callback) {
      console.log(JSON.stringify(args, null, 4));
      const devices = [];
      callback(null, devices.find(dev => dev.deviceId === args.device.deviceId));
    },
    execute: function(args, callback) {
      const s = args.action.name;
      exec(`osascript -e 'display notification "light ${s}" sound name "${s === 'on' ? 'Bottle.aiff' : 'Tink.aiff'}"'`, (err) => {
        console.log('=== execute');
        console.log(JSON.stringify(args, null, 4));
        callback(null, {
         switch: s === 'on' ? 'off' : 'on'
        });
      });
    }
  });

  server.http().listen(PORT);
  console.log('server listen on port %s', PORT);
  cb(null, PORT);
};
