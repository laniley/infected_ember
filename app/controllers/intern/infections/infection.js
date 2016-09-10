/* global FB */
import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({

  clock: Ember.inject.service('clock'),

  queryParams: ['section'],
  section: 'stats',

  save_button_is_active: Ember.computed('model.infection_skill_progresses.@each.marked_to_unlock', function() {
    let is_active = false;
    this.get('model').get('infection_skill_progresses').forEach(progress => {
      if(progress.get('marked_to_unlock') > 0) {
        is_active = true;
      }
    });
    return is_active;
  }),

  max_recipients: Ember.computed('model.reproduction_rate', function() {
    return DS.PromiseObject.create({
      promise: this.get('model.reproduction_rate').then(reproduction_rate => {
        let result = 5;
        if(!Ember.isEmpty(reproduction_rate)) {
          result = (reproduction_rate.get('progress') + 1) * 5;
        }
        return result;
      })
    });
  }),

  last_wave_started_at: Ember.computed('model.infection_waves.length', function() {
    return DS.PromiseObject.create({
      promise: this.get('model.infection_waves').then(infection_waves => {
        let last_wave;
        infection_waves.forEach(wave => {
          if(last_wave == null || last_wave.get('created_at') < wave.get('created_at')) {
            last_wave = wave;
          }
        });
        if(last_wave != null) {
          return last_wave.get('created_at');
        }
        else {
          return '';
        }
      })
    });
  }),

  next_wave_available: Ember.computed('seconds_till_next_wave_total', function() {
    return DS.PromiseObject.create({
      promise: this.get('seconds_till_next_wave_total').then(seconds_till_next_wave_total => {
        if(!Ember.isEmpty(seconds_till_next_wave_total)) {
          return seconds_till_next_wave_total <= 0;
        }
        else {
          return false;
        }
      })
    });
  }),

  next_wave_price: Ember.computed('seconds_till_next_wave_total', function() {
    return DS.PromiseObject.create({
      promise: this.get('seconds_till_next_wave_total').then(seconds_till_next_wave_total => {
        if(!Ember.isEmpty(seconds_till_next_wave_total)) {
          return Math.floor(seconds_till_next_wave_total / 1000);
        }
        else {
          return '';
        }
      })
    });
  }),

  seconds_till_next_wave_total: Ember.computed('last_wave_started_at', 'model.incubation_time', 'clock.time', function() {
    return DS.PromiseObject.create({
      promise: this.get('model.incubation_time').then(incubation_time => {
        return this.get('last_wave_started_at').then(last_wave_started_at => {
          let result = -1;
          let factor = 1.5;
          if(!Ember.isEmpty(incubation_time) && !Ember.isEmpty(last_wave_started_at)) {
            result =  Math.floor((
                        (
                          last_wave_started_at.getTime() +
                          (((16 * factor) - (incubation_time.get('progress') * factor)) * 60 * 60 * 1000)
                        ) - this.get('clock.time')
                      ) / 1000);
          }
          return result;
        });
      })
    });
  }),

  minutes_till_next_wave_total: Ember.computed('seconds_till_next_wave_total', function() {
    return DS.PromiseObject.create({
      promise: this.get('seconds_till_next_wave_total').then(seconds_till_next_wave_total => {
        return Math.floor(seconds_till_next_wave_total / 60);
      })
    });
  }),

  hours_till_next_wave_total: Ember.computed('minutes_till_next_wave_total', function() {
    return DS.PromiseObject.create({
      promise: this.get('minutes_till_next_wave_total').then(minutes_till_next_wave_total => {
        return Math.floor(minutes_till_next_wave_total / 60);
      })
    });
  }),

  seconds_till_next_wave_rest: Ember.computed('seconds_till_next_wave_total', function() {
    return DS.PromiseObject.create({
      promise: this.get('seconds_till_next_wave_total').then(seconds_till_next_wave_total => {
        return this.get('minutes_till_next_wave_total').then(minutes_till_next_wave_total => {
          return seconds_till_next_wave_total - Math.floor(minutes_till_next_wave_total * 60);
        });
      })
    });
  }),

  minutes_till_next_wave_rest: Ember.computed('minutes_till_next_wave_total', function() {
    return DS.PromiseObject.create({
      promise: this.get('minutes_till_next_wave_total').then(minutes_till_next_wave_total => {
        return this.get('hours_till_next_wave_total').then(hours_till_next_wave_total => {
          return minutes_till_next_wave_total - Math.floor(hours_till_next_wave_total * 60);
        });
      })
    });
  }),

  actions: {
    save() {
      if(this.get('save_button_is_active')) {
        this.get('model').get('infection_skill_progresses').forEach(progress => {
          if(progress.get('hasDirtyAttributes')) {
            progress.set('progress', progress.get('progress') + progress.get('marked_to_unlock'));
            progress.set('marked_to_unlock', 0);
            progress.save();
          }
        });
      }
    },
    startInfectionWave() {
      this.get('max_recipients').then(max_recipients => {
        let infection = this.get('model');
        let user_name = this.get('model.user.name');
        FB.ui({
          method: 'apprequests',
          message: 'You\'ve been infected with "' + infection.get('name') + '" by ' + user_name,
          max_recipients: max_recipients
        }, response => {
          console.log(response);
          let wave = this.store.createRecord('infection-wave', {
            infection: infection
          });
          wave.save().then(wave => {
            response.to.forEach(recipient => {
              let transmission = this.store.createRecord('infection-transmission', {
                infection_wave: wave,
                fb_id: recipient
              });
              transmission.save();
            });
          });
        });
      });
    }
  }
});
