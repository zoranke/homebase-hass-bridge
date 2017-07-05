var cv = require('../const');

module.exports = {
  'POST /get': async (ctx, next) => {
    ctx.response.type = 'application/json';
    ctx.response.status = 200;

    var rp = require('request-promise');
    var hass_state = "";
    var p={};
    var hass_base_opt = {
      uri: 'http://'+cv.HASS_IP+':'+cv.HASS_PORT+'/api',
      headers: {
        'Content-Type':'application/json',
      },
      json: true
    };

    console.log(ctx.request.body);
    const hass_passwd = ctx.request.body.userAuth.userToken;
    console.log(hass_passwd);
    const device_id = ctx.request.body.device.deviceId;
    console.log(device_id);

    hass_base_opt.uri += "/states/";
    hass_base_opt.uri += device_id;
    hass_base_opt.headers['x-ha-access'] = hass_passwd;
    console.log(hass_base_opt);

    var reqp = rp(hass_base_opt);
    await reqp.then(function (repos) {
        var state = repos;
        var entity_id = state.entity_id;
        var entity_type = entity_id.toString().split(".")[0];

        if (dev = cv.hass_entity_to_device[entity_type]) {
          state = dev.get_state(state);
          console.log(state);
          p.status = 0;
          p.data = {};
          p.data.deviceId = entity_id;
          p.data.state = state;
          ctx.response.body = p;
        } else {
          p.status = 2;
          p.message = "unsuport device type";
          ctx.response.body = p;
        }
      })
      .catch(function (err) {
        p.status = 2;
        p.message = err.message;
        ctx.response.body = p;
        console.error(`problem with request: ${err.message}`);
      });
    console.log("get end");
  }
};

