#!/usr/bin/env bash

( cd services/products ; npm run dev-with-lb ) &
( cd services/contacts ; npm run dev-with-lb ) &
( cd services/orders ; npm run dev-with-lb ) &
( cd services/gateway ; npm run dev ) &
( cd services/load-balancer; env SERVICE=contacts PORT=8081 SERVICE_NODE_URLS='["http://localhost:3001","http://localhost:3002","http://localhost:3003"]' npm run dev | sed  's/^/[contacts-lb] /' ) &
( cd services/load-balancer; env SERVICE=products PORT=8082 SERVICE_NODE_URLS='["http://localhost:3011", "http://localhost:3012", "http://localhost:3013"]' npm run dev | sed  's/^/[products-lb] /' ) &
( cd services/load-balancer; env SERVICE=orders PORT=8083 SERVICE_NODE_URLS='["http://localhost:3021", "http://localhost:3022", "http://localhost:3023"]' npm run dev | sed  's/^/[orders-lb] /' )