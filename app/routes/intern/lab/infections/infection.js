import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('skill-types', this.store.peekAll('infection-skill-type'));
    controller.set('skill-progresses',
      this.store.query('infection-skill-progress', { 'infection_id': model.get('id') } )
    );
  },
});
