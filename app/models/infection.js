import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  name: DS.attr('string'),
  infection_skill_progresses: DS.hasMany('infection-skill-progress'),
  infection_waves: DS.hasMany('infection-wave'),

  number_of_people_infected: Ember.computed('infection_waves.@each.successful_transmissions', function() {
    return DS.PromiseObject.create({
      promise: this.get('infection_waves').then(waves => {
        let result = 0;
        return Ember.RSVP.map(waves.toArray(), wave => {
          let successful_transmissions = wave.get('successful_transmissions');
          return Ember.RSVP.resolve(successful_transmissions).then(function(successful_transmissions) {
            result += successful_transmissions.get('length');
            return result;
          }).then(result => {
            return result;
          });
        });
      })
    });
  }),

  reproduction_rate: Ember.computed('infection_skill_progresses.length', function() {
    return DS.PromiseObject.create({
      promise: this.get('infection_skill_progresses').then(progresses => {

        let filtered_progresses = progresses.filter(progress => {
          return progress.get('infection_skill').get('id') === '1';
        });

        return filtered_progresses.get('firstObject');
      })
    });
  }),

  incubation_time: Ember.computed('infection_skill_progresses.length', function() {
    return DS.PromiseObject.create({
      promise: this.get('infection_skill_progresses').then(progresses => {

        let filtered_progresses = progresses.filter(progress => {
          return progress.get('infection_skill').get('id') === '2';
        });

        return filtered_progresses.get('firstObject');
      })
    });
  }),

  external_survival: Ember.computed('infection_skill_progresses.length', function() {
    return DS.PromiseObject.create({
      promise: this.get('infection_skill_progresses').then(progresses => {

        let filtered_progresses = progresses.filter(progress => {
          return progress.get('infection_skill').get('id') === '3';
        });

        return filtered_progresses.get('firstObject');
      })
    });
  })
});
