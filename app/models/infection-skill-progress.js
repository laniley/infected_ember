import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  infection: DS.belongsTo('infection'),
  infection_skill: DS.belongsTo('infection-skill'),
  progress: DS.attr('number', { defaultValue: 0 }),
  marked_to_unlock: DS.attr('number', { defaultValue: 0 }),

  new_progress: Ember.computed('', function() {
    return this.get('progress') + this.get('marked_to_unlock');
  })
});
