#!/usr/bin/env bash

( cd services/catalog ; npm run dev-with-lb ) &
( cd services/account ; npm run dev-with-lb ) &
( cd services/gateway ; npm run dev ) &
( cd services/load-balancer; env SERVICE=account PORT=8081 npm run dev ) &
( cd services/load-balancer; env SERVICE=catalog PORT=8082 npm run dev )