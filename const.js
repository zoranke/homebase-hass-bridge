const ip = require('ip');
const fan_dev = require('./devices/fan');
const light_dev = require('./devices/light');
const media_player_dev = require('./devices/media_player');
const switch_dev = require('./devices/switch');

const hass_ip = process.env.HASS_IP || '127.0.0.1';
const hass_port = process.env.HASS_PORT || '8124';
const hass_passwd = process.env.HASS_PASSWD;
const rhass_ip = process.env.RHASS_IP || ip.address();
const rhass_port = process.env.RHASS_PORT || '9999';

module.exports = Object.freeze({
  HASS_IP: hass_ip,
  HASS_PORT: hass_port,
  HASS_PASSWD: hass_passwd,
  RHASS_IP: rhass_ip,
  RHASS_PORT: rhass_port,
  hass_entity_to_device: {
    'light' : light_dev,
    'media_player' : media_player_dev,
    'switch' : switch_dev,
    'fan' : fan_dev
  }
});
