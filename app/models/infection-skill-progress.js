import DS from 'ember-data';

export default DS.Model.extend({
  infection: DS.belongsTo('infection'),
  infection_skill: DS.belongsTo('infection-skill'),
  progress: DS.attr('number', { defaultValue: 0 })
});
