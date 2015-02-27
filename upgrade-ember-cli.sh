npm uninstall -g ember-cli
npm cache clean
bower cache clean
npm install -g ember-cli@0.1.15
rm -rf node_modules bower_components dist tmp
ember install:npm ember-cli@0.1.15
ember install
ember init
