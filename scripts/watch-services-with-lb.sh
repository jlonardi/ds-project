#!/usr/bin/env bash

( cd services/products ; npm run dev-with-lb ) &
( cd services/customer ; npm run dev-with-lb ) &
( cd services/gateway ; npm run dev ) &
( cd services/load-balancer; env SERVICE=customer PORT=8081 npm run dev ) &
( cd services/load-balancer; env SERVICE=products PORT=8082 npm run dev )