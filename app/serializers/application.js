import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'id',
  keyForRelationship(key, relationship) {
    if (relationship === 'belongsTo') {
      return `${key}_id`;
    }
  }
});
