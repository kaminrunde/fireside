#!/bin/bash
cd "$(dirname "$0")"
cd ..
CWD=$1 FIRESIDE_TEST=true npm run start