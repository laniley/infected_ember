import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  tooltip: DS.attr('string'),
  infection_skill_type: DS.belongsTo('infection-skill-type')
});
