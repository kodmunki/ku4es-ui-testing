#!/usr/bin/env bash
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${BASE_DIR}
rm -rf ./node_modules/ku4es-kernel
mkdir ./node_modules/ku4es-kernel
cp -rf ../ku4es-kernel/dist/. ./node_modules/ku4es-kernel
cd -
