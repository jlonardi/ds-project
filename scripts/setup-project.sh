#!/usr/bin/env bash

rm -rf temp

mkdir -p temp

set -e

stty -echo
printf "Password: "
read PASSWORD
stty echo
printf "\n"

unzip -qq -P $PASSWORD vars.zip -d temp/

set +e

source 'scripts/util/services.sh'

for service in "${services[@]}"
do
  cp temp/ds-project/$service/.env services/$service/.env
done

rm -rf temp

scripts/install-packages.sh
scripts/start-db.sh

echo
echo "Waiting the databases to go up"
echo

sleep 10  # Waits 10 seconds.

scripts/run-migrations.sh
scripts/watch-services-with-lb.sh

echo "Done!"