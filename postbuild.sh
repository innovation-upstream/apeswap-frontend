#!/usr/bin/env sh

set -uo errexit

nohup yarn ganache &
yarn snap
pkill -f ganache-cli
