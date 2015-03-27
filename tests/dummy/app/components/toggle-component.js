import Ember from 'ember';

export default Ember.Component.extend({
  showContent: true,
  classNames: ["lightGrey"],
  click() {
    this.set("showContent", !this.get("showContent"))
  }
});
