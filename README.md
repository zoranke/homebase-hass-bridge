## Homebase Homeassistant bridge

you need nodejs 7.9 + to run this sample

## Start server

```
$ npm install -g homebase-hass-bridge
$ rhass
```

## Install from source code

```
git clone https://github.com/SchumyHao/homebase-hass-bridge.git
cd homebase-hass-bridge
npm install .
```

## What have done

- Automatically find HASS's switch, light, media_player and fan.
Can Turn on and off those devices.
- Can hidden HASS device from rhass by set **rhass_hidden** in attributes.
```
homeassistant:
  customize:
    switch.smart_mi_fan_natural_wind_switch:
      rhass_hidden: true
```
