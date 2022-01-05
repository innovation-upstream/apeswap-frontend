#!/usr/bin/env sh

set -uo errexit

# Ensure libgconf-2-4 is installed (required by chromium)
if [ "$(ldconfig -p | grep libgconf-2.so.4)" = "" ]; then
  yum update -y && yum install -y GConf2.x86_64
fi

nohup yarn ganache > yarn-debug.log.ganache &
yarn snap
pkill -f ganache-cli
