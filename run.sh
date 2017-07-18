#!/bin/bash

type rhass >/dev/null 2>&1
ret=$?

if [ $ret -ne 0 ]
then
  yarn global add homebase-hass-bridge -prefix /usr/local
else
  yarn global upgrade homebase-hass-bridge -prefix /usr/local
fi

rhass
