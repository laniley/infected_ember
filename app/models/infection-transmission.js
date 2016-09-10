import DS from 'ember-data';

export default DS.Model.extend({
  infection_wave: DS.belongsTo('infection-wave'),
  recipient: DS.belongsTo('user'),
  fb_id: DS.attr('string')
});
