#!/usr/bin/env bash

echo
echo "------- Setting environment variables -------"
echo

rm -rf temp

mkdir -p temp
unzip -qq vars.zip -d temp/

echo 'Done!'
echo


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
scripts/watch-services.sh

echo "Done!"