#!/bin/sh
env > .env
npm run build
exec serve -s build -d -l ${PORT:-3000} $@
