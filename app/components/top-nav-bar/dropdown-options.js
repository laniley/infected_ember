import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dropdown-options'],

  mouseEnter() {
    this.sendAction();
  },
  mouseLeave() {
    this.sendAction();
  },

  openDropdown() {
    this.sendAction();
  },

  closeDropdown() {
    this.sendAction();
  }
});
