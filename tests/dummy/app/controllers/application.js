import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToLoginView: function () {
      this.transitionToRoute("login");
    },
    goToInputsView: function () {
      this.transitionToRoute("inputs");
    }
  }
});
