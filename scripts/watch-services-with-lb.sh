#!/usr/bin/env bash

( cd services/products ; npm run dev-with-lb ) &
( cd services/customers ; npm run dev-with-lb ) &
( cd services/gateway ; npm run dev ) &
( cd services/load-balancer; env SERVICE=customers PORT=8081 npm run dev | sed  's/^/[customers-lb] /' ) &
( cd services/load-balancer; env SERVICE=products PORT=8082 npm run dev | sed  's/^/[products-lb] /' )