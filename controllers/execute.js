var cv = require('../const');

module.exports = {
  'POST /execute': async (ctx, next) => {
    ctx.response.type = 'application/json';
    ctx.response.status = 200;

    var rp = require('request-promise');
    var p={};
    var hass_base_opt = {
      uri: 'http://'+cv.HASS_IP+':'+cv.HASS_PORT+'/api',
      headers: {
        'Content-Type':'application/json',
      },
      json: true
    };
    var hass_passwd = '';

    if (ctx.request.body.device.userAuth)
      hass_passwd = ctx.request.body.device.userAuth.userToken;
    hass_passwd = hass_passwd || cv.HASS_PASSWD;

    const device_id = ctx.request.body.device.deviceId;
    const action_prop = ctx.request.body.action.property;
    const action_name = ctx.request.body.action.name;

    hass_base_opt.uri += "/services/";
    hass_base_opt.method = "POST";
    if (hass_passwd)
      hass_base_opt.headers['x-ha-access'] = hass_passwd;
    var entity_type = device_id.toString().split(".")[0];

    if (dev = cv.hass_entity_to_device[entity_type]) {
      hass_base_opt.uri += dev.domain;
      hass_base_opt.uri += "/";
      hass_base_opt.uri += dev[action_prop][action_name];
      hass_base_opt.body = {
        entity_id: device_id
      };

      var reqp = rp(hass_base_opt);
      await reqp.then(function (repos) {
          p.status = 0;
          p.data = {};
          ctx.response.body = p;
        })
        .catch(function (err) {
          p.status = 3;
          p.message = err.message;
          ctx.response.body = p;
          console.error(`problem with request: ${err.message}`);
        });
      console.log("execute end");
    } else {
      p.status = 3;
      p.message = "unsuport device type";
      ctx.response.body = p;
    }
  }
};

