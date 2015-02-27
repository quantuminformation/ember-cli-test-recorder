/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-test-recorder'
  included: function (app) {
    app.import("vendor/testRecorder.js")
  }
};
