import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { /*belongsTo,*/ hasMany } from 'ember-data/relationships';
import { memberAction } from 'ember-api-actions';

export default Model.extend({
  fb_id: attr('string'),
  first_name: attr('string'),
  last_name: attr('string'),
  gender: attr('string'),
  locale: attr('string'),
  max_infections: attr('number', { defaultValue: 1 }),
  eps: attr('number', { defaultValue: 5 }),
  rps: attr('number', { defaultValue: 5 }),
  tutorial_step_id: attr('number'),

  infections: hasMany('infection'),

  img_url: Ember.computed('fb_id', function () {
    return `http://graph.facebook.com/${this.get('fb_id')}/picture`;
  }),

  name: Ember.computed('first_name', 'last_name', function () {
    return `${this.get('first_name')} ${this.get('last_name')}`;
  }),

  updateTutorialStep: memberAction({ path: 'updateTutorialStep' }),
});
