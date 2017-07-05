//mock devices
const hass_entity_to_device = {
  'fan' : {
    type : 'fan',
    actions : {
      switch: ["on", "off"],
      fanspeed: ["up", "down", "max", "min", "switch", "num"],
      swing_mode: ["on", "off"]
    },
    state : {
      switch: null,
      fanspeed: null,
      swing_mode: null
    }
  },
  'light' : {
    type : 'light',
    actions : {
      switch: ["on", "off"],
      color: ["num"],
      brightness: ["up", "down", "max", "min", "num"]
    },
    state : {
      switch: null,
      color: null,
      brightness: null
    }
  },
  'media_player' : {
    type : 'tv',
    actions : {
      switch: ["on", "off"],
      volume: ["up", "down", "max", "min", "num"],
      channel: ["next", "prev", "num"]
    },
    state : {
      switch: null,
      volume: null,
      channel: null
    }
  },
  'switch' : {
    type : 'switch',
    actions : {
      switch: ["on", "off"]
    },
    state : {
      switch: null
    }
  }
};

module.exports = {
  'POST /list': async (ctx, next) => {
    ctx.response.type = 'application/json';
    ctx.response.status = 200;

    var rp = require('request-promise');
    var hass_status = "";
    var p={};
    var hass_base_opt = {
      uri: 'http://192.168.1.198:8123/api',
      headers: {
        'Content-Type':'application/json',
      },
      json: true
    };
    var devices = [];

    const hass_passwd = ctx.request.body.userAuth.userToken;

    hass_base_opt.uri += "/states";
    hass_base_opt.headers['x-ha-access'] = hass_passwd;

    var reqp = rp(hass_base_opt);
    await reqp.then(function (repos) {
        var status = repos;

        for(let i = 0; i < status.length; i++) {
          var entity_id = status[i].entity_id;
          var entity_type = entity_id.toString().split(".")[0];
          var entity_name = entity_id.toString().split(".")[1];
          var name = status[i].attributes.friendly_name || entity_name;

          if (hass_entity_to_device[entity_type]) {
            devices.push({
              deviceId: entity_id,
              name: name,
              type: hass_entity_to_device[entity_type].type,
              actions: hass_entity_to_device[entity_type].actions,
              state: hass_entity_to_device[entity_type].state,
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
        ctx.response.message = p;
        console.error(`problem with request: ${err.message}`);
      });
    console.log("list end");
  }
};



