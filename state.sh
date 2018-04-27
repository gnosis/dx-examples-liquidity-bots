#!/usr/bin/env bash

TOKEN_PAIR=${1:-WETH-RDN}

docker run \
  -e NETWORK=rinkeby \
  -e MARKETS=WETH-RDN \
  -e WETH_TOKEN_ADDRESS=0xc58b96a0278bd2c77bc93e01b148282fb8e753a5 \
  -e RDN_TOKEN_ADDRESS=0xde6efd396e18a950b45e24d6225505f48d0c627b \
  gnosispm/dx-services:develop \
  npm run cli -- state $TOKEN_PAIR