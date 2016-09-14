import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

  clock: Ember.inject.service('clock'),

  infection: DS.belongsTo('infection'),
  infection_transmissions: DS.hasMany('infection-transmission'),

  ends_at: DS.attr('date'),
  created_at: DS.attr('date'),

  successful_transmissions: Ember.computed('infection_transmissions.length', function() {
    return DS.PromiseObject.create({
      promise: this.get('infection_transmissions').then(infection_transmissions => {
        return infection_transmissions.filterBy('status', 1);
      })
    });
  }),

  infection_failed: Ember.computed('infection_transmissions.length', function() {
    return DS.PromiseObject.create({
      promise: this.get('infection_transmissions').then(infection_transmissions => {
        return infection_transmissions.filterBy('status', 2);
      })
    });
  }),

  seconds_till_end_total: Ember.computed('clock.time', 'ends_at', function() {
    if(this.get('ends_at') !== undefined) {
      return Math.floor((this.get('ends_at').getTime() - this.get('clock.time')) / 1000);
    }
    else {
      return -1;
    }
  }),

  seconds_till_end_rest: Ember.computed('seconds_till_end_total', function() {
    return this.get('seconds_till_end_total') - Math.floor(this.get('minutes_till_end_total') * 60);
  }),

  minutes_till_end_total: Ember.computed('seconds_till_end_total', function() {
    return Math.floor(this.get('seconds_till_end_total') / 60);
  }),

  minutes_till_end_rest: Ember.computed('minutes_till_end_total', function() {
    return this.get('minutes_till_end_total') - Math.floor(this.get('hours_till_end_total') * 60);
  }),

  hours_till_end_total: Ember.computed('minutes_till_end_total', function() {
    return Math.floor(this.get('minutes_till_end_total') / 60);
  }),

  hours_till_end_rest: Ember.computed('hours_till_end_total', function() {
    return this.get('hours_till_end_total') - Math.floor(this.get('days_till_end') * 24);
  }),

  days_till_end: Ember.computed('hours_till_end_total', function() {
    return Math.floor(this.get('hours_till_end_total') / 24);
  }),

});
