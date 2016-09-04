import DS from 'ember-data';

export default DS.Model.extend({
  infection: DS.belongsTo('infection')
});
