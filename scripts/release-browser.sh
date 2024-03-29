#!/bin/sh
VERSION=$(npm view ku4es-ui-testing version)
cp -R browser/index.js ../utils/ku4es-ui-testing.js

cd ../utils
git pull
git add .
git commit -anm"ku4es-ui-testing@${VERSION}"
git push
cd -

echo '== Released =='
echo ${VERSION}
echo '=============='
echo 'Done'
exit 0;
