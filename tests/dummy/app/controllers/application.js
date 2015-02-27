import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    goToLoginView: function () {
      this.transitionToRoute("login");
    },
    goToRegisterView: function () {
      this.transitionToRoute("register");
    }
  }
});
