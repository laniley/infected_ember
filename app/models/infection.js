import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  name: DS.attr('string'),
  infection_skill_progresses: DS.hasMany('infection-skill-progress')
});
