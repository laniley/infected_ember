import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  name: DS.attr('string'),
  infection_skill_progresses: DS.hasMany('infection-skill-progress'),

  reproduction_rate: Ember.computed('infection_skill_progresses.length', function() {
    return DS.PromiseObject.create({
      promise: this.get('infection_skill_progresses').then(progresses => {

        let filtered_progresses = progresses.filter(progress => {
          return progress.get('infection_skill').get('id') === '1';
        });

        return filtered_progresses.get('firstObject');
      })
    });
  })
});
