import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  tooltip: DS.attr('string'),
  infection_skills: DS.hasMany('infection-skill')
});
