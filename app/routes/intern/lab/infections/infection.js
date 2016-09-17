import Ember from 'ember';

export default Ember.Route.extend({
  parentController: Ember.computed( function() {
    return this.controllerFor('intern/infections');
  }),

  setupController: function(controller, model) {
    this._super(controller, model);
    this.get('parentController').set('content_is_closed', false);
    controller.set('skill-types', this.store.peekAll('infection-skill-type'));
    controller.set('skill-progresses',
      this.store.query('infection-skill-progress', { 'infection_id': model.get('id') } )
    );
  },

  actions: {
    willTransition(/*transition*/) {
      this.get('parentController').set('content_is_closed', true);
    }
  }
});
