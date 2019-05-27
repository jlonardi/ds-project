#!/usr/bin/env bash

source 'scripts/util/services.sh'

for service in "${services[@]}"
do
  ( cd "services/$service" ; npx db-migrate up )
done
