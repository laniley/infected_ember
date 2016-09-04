
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import FacebookLoginMixin from './../mixins/fb-login';

export default Ember.Route.extend(AuthenticatedRouteMixin, FacebookLoginMixin, {

  model: function() {
    var me = this.store.peekRecord('me', 1);

    if(Ember.isEmpty(me)) {
      return this.store.createRecord('me', { id: 1 });
    }
    else {
      return me;
    }
  },

  afterModel() {
    this.getUserDataFromFB(); // in /mixins/fb-login
    this.getGameDataFromDB();
  },

  getGameDataFromDB() {
    this.store.findAll('infection-skill-type');
    this.store.findAll('infection-skill');
  }

});
