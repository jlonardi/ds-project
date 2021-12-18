#!/usr/bin/env bash

( cd services/catalog ; npm run dev ) &
( cd services/customer ; npm run dev ) &
( cd services/gateway ; npm run dev )

