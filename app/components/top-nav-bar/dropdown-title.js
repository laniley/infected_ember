import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dropdown-title'],

  mouseEnter() {
    this.sendAction();
  },
  mouseLeave() {
    this.sendAction();
  },
  click() {
    this.sendAction();
  }
});
