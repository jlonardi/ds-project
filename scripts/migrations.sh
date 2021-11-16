#!/usr/bin/env bash

source 'scripts/util/services.sh'

for service in "${services[@]}"
do
  echo
  echo "------- Running migrations for service ${service} -------"
  echo
  ( cd "services/$service" ; npx db-migrate up )
done
