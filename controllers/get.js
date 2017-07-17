var cv = require('../const');

module.exports = {
  'POST /get': async (ctx, next) => {
    ctx.response.type = 'application/json';

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
    var hass_passwd = '';

    if (ctx.request.body.userAuth)
      hass_passwd = ctx.request.body.userAuth.userToken;
    hass_passwd = hass_passwd || cv.HASS_PASSWD;

    const device_id = ctx.request.body.device.deviceId;

    hass_base_opt.uri += "/states/";
    hass_base_opt.uri += device_id;
    if (hass_passwd)
      hass_base_opt.headers['x-ha-access'] = hass_passwd;

    var reqp = rp(hass_base_opt);
    await reqp.then(function (repos) {
        var state = repos;
        var entity_id = state.entity_id;
        var entity_type = entity_id.toString().split(".")[0];

        if (dev = cv.hass_entity_to_device[entity_type]) {
          state = dev.states(state);
          p.status = 0;
          p.data = {};
          p.data.deviceId = entity_id;
          p.data.state = state;
          ctx.response.body = p;
          ctx.response.status = 200;
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

