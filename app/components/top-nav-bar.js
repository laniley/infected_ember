import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  classNames: ['top-nav-bar'],

  actions: {
    logout: function() {
      this.get('session').invalidate();
    }
  }
});
