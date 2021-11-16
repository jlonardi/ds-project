#!/usr/bin/env bash

rm -rf downloads

mkdir -p downloads
curl -L -X GET https://api.onedrive.com/v1.0/shares/s!AjyRCN3EI939hrdLVYs_a5rFL9oL4Q/root/content > downloads/envs.zip

set -e

stty -echo
printf "Password: "
read PASSWORD
stty echo
printf "\n"

unzip -qq -P $PASSWORD downloads/envs.zip -d downloads/

set +e

source 'scripts/util/services.sh'

for service in "${services[@]}"
do
  cp downloads/ds-project/$service/.env services/$service/.env
done

rm -rf downloads

scripts/install-packages.sh
scripts/start-db.sh

echo
echo "Waiting the databases to go up"
echo

sleep 10  # Waits 10 seconds.

scripts/run-migrations.sh
scripts/watch-services.sh

echo "Done!"