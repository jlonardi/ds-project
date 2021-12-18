#!/usr/bin/env bash

echo "------- Installing root packages -------"
echo

npm install

source 'scripts/util/services.sh'

for service in "${services[@]}"
do
  echo
  echo "------- Installing packages for ${service} service -------"
  echo
   ( cd "services/$service" ; npm install )
done

  echo
  echo "------- Installing packages for the load balancer -------"
  echo
   ( cd "services/load-balancer" ; npm install )