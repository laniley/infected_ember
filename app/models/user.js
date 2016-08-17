import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default
Model.extend({
  fb_id: attr('string'),
  first_name: attr('string'),
  last_name: attr('string'),

  img_url: Ember.computed('fb_id', function () {
    return `http://graph.facebook.com/${this.get('fb_id')}/picture`;
  }),
});
