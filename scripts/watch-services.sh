#!/usr/bin/env bash

( cd services/products ; npm run dev ) &
( cd services/customers ; npm run dev ) &
( cd services/gateway ; npm run dev )

