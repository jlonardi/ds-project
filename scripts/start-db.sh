#!/usr/bin/env bash

source 'scripts/util/services.sh'

for service in "${services[@]}"
do
  echo
  echo "------- Start ${service}-db -------"
  echo
  docker-compose --env-file ./services/$service/.env up -d $service-db
done
