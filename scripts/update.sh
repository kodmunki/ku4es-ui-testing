npm outdated --long \
| grep dependencies \
| awk '{print $1"@"$4}' \
| xargs npm i -S;

npm outdated --long \
| grep devDependencies \
| awk '{print $1"@"$4}' \
| xargs npm i -D;
