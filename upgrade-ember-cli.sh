npm uninstall -g ember-cli
npm cache clean
bower cache clean
npm install -g ember-cli@1.13.13
npm install ember-cli@1.13.1 --save-dev
rm -rf node_modules bower_components dist tmp
npm install
bower install
ember init
