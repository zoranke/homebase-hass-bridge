const hass_ip = process.env.HASS_IP || '127.0.0.1';
const hass_port = process.env.HASS_PORT || '8123';
const hass_passwd = process.env.HASS_PASSWD;

module.exports = Object.freeze({
  HASS_IP: hass_ip,
  HASS_PORT: hass_port,
  HASS_PASSWD: hass_passwd,
  hass_entity_to_device: {
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
      },
      get_state: (hass_state) => {
        var state = {};
        if (hass_state.state == "off")
          state.switch = "off";
        if (hass_state.state == "on")
          state.switch = "on";
        return state;
      },
      domain: 'fan',
      switch: {
        on: 'turn_on',
        off: 'turn_off'
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
      },
      get_state: (hass_state) => {
        var state = {};
        if (hass_state.state == "off")
          state.switch = "off";
        if (hass_state.state == "on")
          state.switch = "on";
        return state;
      },
      domain: 'light',
      switch: {
        on: 'turn_on',
        off: 'turn_off'
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
      },
      get_state: (hass_state) => {
        var state = {};
        if ((hass_state.state == "off") || (hass_state.state == "idle"))
          state.switch = "off";
        if (hass_state.state == "on")
          state.switch = "on";
        return state;
      },
      domain: 'media_player',
      switch: {
        on: 'turn_on',
        off: 'turn_off'
      }
    },
    'switch' : {
      type : 'switch',
      actions : {
        switch: ["on", "off"]
      },
      state : {
        switch: null
      },
      get_state: (hass_state) => {
        var state = {};
        if (hass_state.state == "off")
          state.switch = "off";
        if (hass_state.state == "on")
          state.switch = "on";
        return state;
      },
      domain: 'switch',
      switch: {
        on: 'turn_on',
        off: 'turn_off'
      }
    }
  }
});