module.exports = Object.freeze({
  HASS_IP: '192.168.1.198',
  HASS_PORT: '8123',
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
      }
    }
  }
});