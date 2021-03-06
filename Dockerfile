#
# Dockerfile for rhome_hass_bridge
#

FROM node:8.9

MAINTAINER SchumyHao <bob-hjl@126.com>

ENV DEBIAN_FRONTEND noninteractive
ENV TERM xterm
ENV TZ=Asia/Shanghai

RUN apt-get update --fix-missing; \
    apt-get install -yq bash

USER root

EXPOSE 9999

ADD run.sh /root/run.sh

ENV HASS_IP '127.0.0.1'
ENV HASS_PORT '8123'

CMD ["/root/run.sh"]
