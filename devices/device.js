module.exports = function dev(type, support_actions) {
  this.type = type;
  this.sa = support_actions;
  this.actions = () => {
    var acts = {};
    for (let i = 0; i < this.sa.length; i++)
      acts[this.sa[i].prop] = this.sa[i].hb_action;
    return acts;
  };
  this.states = (ha_state) => {
    var stas = {};
    for (let i = 0; i < this.sa.length; i++)
      stas[this.sa[i].prop] = this.sa[i].ha_2_hb_state(ha_state);
    return stas;
  };
  this.get_uri = (id, prop, name) => {
    for (let i = 0; i < this.sa.length; i++)
      if (this.sa[i].prop = prop)
        return this.sa[i].hb_2_ha_service_uri(id, name);
  };
  this.get_body = (id, prop, name) => {
    for (let i = 0; i < this.sa.length; i++)
      if (this.sa[i].prop = prop)
        return this.sa[i].hb_2_ha_service_body(id, name);
  };
}
