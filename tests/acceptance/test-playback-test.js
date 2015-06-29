import Ember from 'ember';
import {
  module,
  test
  } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';
//import startApp from '../helpers/start-app.js';

var application;

module('Acceptance: TestPlayback', {
  beforeEach: function () {
    application = startApp();
  },

  afterEach: function () {
    Ember.run(application, 'destroy');
  }
});

/**
 * This code inside this function has been generated from the test recorder, it is placed in here just to see if it
 * can play back what was recorded in the browser code recorder.
 */
test('Playback code', function (assert) {
//assume that the user starts  on index
  visit('inputs');
  andThen(function () {


  });

  stop();
});
