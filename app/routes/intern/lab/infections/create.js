import Ember from 'ember';

export default Ember.Route.extend({
  parentController: Ember.computed( function() {
    return this.controllerFor('intern/lab/infections');
  }),

  setupController: function(controller, model) {
    this._super(controller, model);
    this.get('parentController').set('content_is_closed', false);
  },

  actions: {
    willTransition(/*transition*/) {
      this.get('parentController').set('content_is_closed', true);
    }
  }
});
