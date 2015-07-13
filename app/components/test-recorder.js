import Ember from 'ember';
import TestRecorderUtils from 'ember-cli-test-recorder/util/TestRecorderUtils';

export default Ember.Component.extend({

  willDestroyElement: function () {
    console.log("destroying " + this.get("mutationObserversArr").length + " mut observers ");
    this.get("mutationObserversArr").forEach(function (observer) {
      observer.disconnect();
    });
  },


});

