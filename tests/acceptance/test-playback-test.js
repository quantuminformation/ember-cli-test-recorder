import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'ember-cli-test-recorder/tests/helpers/start-app';

var application;

module('Acceptance: TestPlayback', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

/**
 * This code inside this function has been generated from the test recorder, it is placed in here just to see if it
 * can play back what was recorded in the browser code recorder.
 */
test('Playback code', function(assert) {
//assume that the user starts  on index
  click("html>body>div>header>button:eq(1)");
  andThen(function () {
    assert.equal(currentRouteName(), "register", "The page navigates to register on button click");
    assert.equal(find("#login-foo-component-with-nested-components").length, 0, "login-foo-component-with-nested-components removed AFTER user [INSERT REASON]");
    assert.equal(find("#ember393").length, 0, "ember393 removed AFTER user [INSERT REASON]");
    assert.equal(find("#register-select-1").length, 1, "register-select-1 shown AFTER user [INSERT REASON]");
    assert.equal(find("#register-input-1").length, 1, "register-input-1 shown AFTER user [INSERT REASON]");
    assert.equal(find("#register-p-1").length, 1, "register-p-1 shown AFTER user [INSERT REASON]");

  });




});
