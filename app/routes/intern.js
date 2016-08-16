/* global FB */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  scope: 'id,first_name,last_name,friends,invitable_friends',

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
    this.getUserDataFromFB();
  },

  getUserDataFromFB(callback) {

    console.log('Welcome!  Fetching your information.... ');
    var store = this.get('store');

  	FB.api('/me', { fields: this.get('scope') }, response => {

  		if( !response.error ) {

        console.log('Successful login for: ' + response.first_name + " " + response.last_name, response);
        var me = store.peekRecord('me', 1);
        // response.id = 10202654621741836; // for testing
        var user = store.query('user', { fb_id: response.id, mode: 'me' }).then(users => {

          if(Ember.isEmpty(users)) {
            user = store.createRecord('user');
            me.set('user', user);
            user.set('fb_id', response.id);
            user.set('first_name', response.first_name);
            user.set('last_name', response.last_name);
            user.save();
            this.transitionTo('intern.welcome');
          }
          else {
            user = users.get('firstObject');
            me.set('user', user);
            user.set('fb_id', response.id);
            user.set('first_name', response.first_name);
            user.set('last_name', response.last_name);
          }

          this.loadFriends(me, response);

        });
  		}
  		else {
  			console.log(response.error);
  		}
      if(callback) {
        callback();
      }
  	});
  },

  loadFriends(me, response) {
    // friends already playing the game
    console.log('friends', response["friends"]);
    response.friends.data.forEach(friend => {
      var aFriend = this.store.createRecord('friend', {
        me: me,
        fb_id: friend.id, // real fb-user-id
        name: friend.name,
        is_already_playing: true
      });
      // load user
      this.store.query('user', { 'fb_id': friend.id }).then(users => {
        aFriend.set('user', users.get('firstObject'));
      });
    });
    // frinds not yet playing the game
    console.log('invitable_friends', response.invitable_friends);
    response.invitable_friends.data.forEach(friend => {
      this.store.createRecord('friend', {
        me: me,
        fb_id: friend.id, // id only valid for this specific session
        name: friend.name,
        is_already_playing: false
      });
    });
  }
});
