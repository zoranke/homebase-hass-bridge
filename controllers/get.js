//mock devices
const devices = [];

function get_fan_state(hass_state) {
  var state = {};

  if (hass_state.state == "off")
    state.switch = "off";
  if (hass_state.state == "on")
    state.switch = "on";
}

function get_light_state(hass_state) {
  var state = {};

  if (hass_state.state == "off")
    state.switch = "off";
  if (hass_state.state == "on")
    state.switch = "on";
}

function get_media_player_state(hass_state) {
  var state = {};

  if (hass_state.state == "off")
    state.switch = "off";
  if (hass_state.state == "on")
    state.switch = "on";
}

function get_switch_state(hass_state) {
  var state = {};

  if (hass_state.state == "off")
    state.switch = "off";
  if (hass_state.state == "on")
    state.switch = "on";
}

var hass_base_opt = {
  hostname: '192.168.1.198',
  port: 8123,
  path: '/api',
  headers: {
    'Content-Type':'application/json',
  }
};

module.exports = {
  'POST /get': async (ctx, next) => {
    ctx.response.type = 'application/json';

    var http = require('http');
    var hass_state = "";
    var p={};

    const hass_passwd = ctx.request.body.device.userAuth.userToken;
    console.log(hass_passwd);
    const device_id = ctx.request.body.device.deviceId;
    console.log(device_id);

    hass_base_opt.path += "/states/";
    hass_base_opt.path += device_id;
    hass_base_opt.method = "GET";
    hass_base_opt.headers['x-ha-access'] = hass_passwd;
    console.log(hass_base_opt);
    const req = http.request(hass_base_opt, function (res) {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        hass_state += chunk;
      });
      res.on('end', () => {
        var state = JSON.parse(hass_state);
        var entity_id = status.entity_id;
        var entity_type = entity_id.toString().split(".")[0];

        if (entity_type == "fan") {
          state = get_fan_state(state);
        } else if (entity_type == "light") {
          state = get_light_state(state);
        } else if (entity_type == "media_player") {
          state = get_media_player_state(state);
        } else if (entity_type == "switch") {
          state = get_switch_state(state);
        } else {
          p.status = 2;
          p.message = "unsuport device type";
          ctx.response.body = p;
          return;
        }
        p.status = 0;
        p.data.deviceId = entity_id;
        p.data.state = state;
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
  }
};

