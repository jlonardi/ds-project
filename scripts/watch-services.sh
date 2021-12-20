#!/usr/bin/env bash

( cd services/products ; npm run dev ) &
( cd services/contacts ; npm run dev ) &
( cd services/gateway ; npm run dev )

