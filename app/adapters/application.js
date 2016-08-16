import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.backend_url,
  namespace: ENV.backend_namespace
});
