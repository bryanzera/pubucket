#!/bin/sh
docker run -it \
  --env-file=$PWD/.env \
  --mount type=bind,source="$PWD",target=/usr/src/app \
  -p 8014:8014 \
  bryanzera/pubucket