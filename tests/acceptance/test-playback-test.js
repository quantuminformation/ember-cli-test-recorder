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
  visit('/');
  click("div:eq(0)>header>button:eq(1)");
  andThen(function () {
    assert.equal(currentRouteName(), "foo", "The page navigates to foo on button click");
    assert.equal(find("#register-input-1").length, 0, "register-input-1 removed AFTER user [INSERT REASON]");
    assert.equal(find("#login-foo-component-with-nested-components").length, 1, "login-foo-component-with-nested-components shown AFTER user [INSERT REASON]");

  });

  click("div:eq(0)>header>button:eq(0)");
  andThen(function () {
    assert.equal(currentRouteName(), "index", "The page navigates to index on button click");
    assert.equal(find("#login-foo-component-with-nested-components").length, 0, "login-foo-component-with-nested-components removed AFTER user [INSERT REASON]");
    assert.equal(find("#register-input-1").length, 1, "register-input-1 shown AFTER user [INSERT REASON]");

  });


});
