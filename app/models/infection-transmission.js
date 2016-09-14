import DS from 'ember-data';

export default DS.Model.extend({
  infection_wave: DS.belongsTo('infection-wave'),
  user: DS.belongsTo('user'),
  recipient_fb_id: DS.attr('string'),
  status: DS.attr('number')
});
