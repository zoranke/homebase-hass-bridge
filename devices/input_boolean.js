const dev = require('./device');
const support_actions = [
  {
    prop: "switch",
    hb_action: ["on", "off"],
    ha_2_hb_state: (ha_state) => {
      if (ha_state.state == "off")
        return "off";
      else if (ha_state.state == "on")
        return "on";
      else {
        console.error("%s switch got invalid ha state %s",
          ha_state.entity_id, ha_state.state);
        return null;
      }
    },
    hb_2_ha_service_uri: (id, name) => {
      if (name == "on")
        return "input_boolean/turn_on";
      else if (name == "off")
        return "input_boolean/turn_off";
      else {
        console.error("Input_boolean switch got invalid hb service %s", name);
        return null;
      }
    },
    hb_2_ha_service_body: (id, name) => {
      return {entity_id: id};
    }
  }
];

module.exports = new dev('scene', support_actions);
