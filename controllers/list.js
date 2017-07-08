var cv = require('../const');

module.exports = {
  'POST /list': async (ctx, next) => {
    ctx.response.type = 'application/json';
    ctx.response.status = 200;

    var rp = require('request-promise');
    var hass_status = "";
    var p={};
    var hass_base_opt = {
      uri: 'http://'+cv.HASS_IP+':'+cv.HASS_PORT+'/api',
      headers: {
        'Content-Type':'application/json',
      },
      json: true
    };
    var devices = [];
    var hass_passwd = '';

    if (ctx.request.body.userAuth)
      hass_passwd = ctx.request.body.userAuth.userToken;
    hass_passwd = hass_passwd || cv.HASS_PASSWD;

    hass_base_opt.uri += "/states";
    if (hass_passwd)
      hass_base_opt.headers['x-ha-access'] = hass_passwd;

    var reqp = rp(hass_base_opt);
    await reqp.then(function (repos) {
        var status = repos;

        for(let i = 0; i < status.length; i++) {
          var entity_id = status[i].entity_id;
          var entity_type = entity_id.toString().split(".")[0];
          var entity_name = entity_id.toString().split(".")[1];
          var name = status[i].attributes.friendly_name || entity_name;

          if (cv.hass_entity_to_device[entity_type]) {
            devices.push({
              deviceId: entity_id,
              name: name,
              type: cv.hass_entity_to_device[entity_type].type,
              actions: cv.hass_entity_to_device[entity_type].actions,
              state: cv.hass_entity_to_device[entity_type].state,
              offline: false,
              deviceInfo: status[i].attributes
            });
          }
        }
        p.status = 0;
        p.data = devices;
        ctx.response.body = p;
        console.log("done");
      })
      .catch(function (err) {
        p.status = 1;
        p.message = err.message;
        ctx.response.body = p;
        console.error(`problem with request: ${err.message}`);
      });
    console.log("list end");
  }
};
