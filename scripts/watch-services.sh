#!/usr/bin/env bash

( cd services/catalog ; npm run dev ) &
( cd services/account ; npm run dev ) &
( cd services/gateway ; npm run dev )

