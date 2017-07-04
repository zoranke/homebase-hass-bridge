//mock devices
const devices = [];

module.exports = {
  'POST /execute': async (ctx, next) => {
    ctx.response.type = 'application/json';

    var http = require('http');
    var p={};

    const hass_passwd = ctx.request.body.device.userAuth.userToken;
    console.log(hass_passwd);
    const device_id = ctx.request.body.device.deviceId;
    console.log(device_id);

    hass_base_opt.path += "/services/";
    hass_base_opt.method = "POST";
    hass_base_opt.headers['x-ha-access'] = hass_passwd;
    console.log(hass_base_opt);

    var device_type = device_id.toString().split(".")[0];
    if (device_type == "fan") {
      hass_base_opt.path += "fan/turn_on";
      const req = http.request(hass_base_opt, function (res) {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          hass_state += chunk;
        });
        res.on('end', () => {
          p.status = 0;
          p.data.state = null;
          ctx.response.body = p;
        });
      });
      req.setTimeout(5000);
      req.on('error', (e) => {
        p.status = 1;
        p.message = e.message;
        ctx.response.body = p;
        console.error(`problem with request: ${e.message}`);
      });
      req.end();
    } else {
      p.status = 2;
      p.message = "unsuport device type";
      ctx.response.body = p;
      return;
    }
  }
};

