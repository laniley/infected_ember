/* global FB */
import Ember from 'ember';

export default Ember.Mixin.create({

  scope: 'id,first_name,last_name,gender,locale,friends,invitable_friends',
  session: Ember.inject.service('session'),

  getUserDataFromFB() {
    console.log('Welcome!  Fetching your information.... ');
    var store = this.get('store');

    return new Ember.RSVP.Promise((resolve) => {
      FB.api('/me', { fields: this.get('scope') }, response => {

        if( !response.error ) {

          console.log('Successful login for: ' + response.first_name + " " + response.last_name, response);
          var me = store.peekRecord('me', 1);
          // response.id = 10202654621741836; // for testing

          store.query('user', { fb_id: response.id, mode: 'me' }).then(users => {
            let user;
            // new user
            if(Ember.isEmpty(users)) {
              user = store.createRecord('user', {
                'fb_id': response.id,
                'first_name': response.first_name,
                'last_name': response.last_name,
                'gender': response.gender,
                'locale': response.locale,
                'max_infections': 1,
                'tutorial_step_id': 1
              });
            }
            // existing user
            else {
              user = users.get('firstObject');
              user.setProperties({
                'fb_id': response.id,
                'first_name': response.first_name,
                'last_name': response.last_name,
                'gender': response.gender,
                'locale': response.locale
              });
            }

            me.set('user', user);

            user.save().then(user => {
              this.get('session').set('data.user_id', user.get('id'));
              if(user.get('tutorial_step_id') !== 0) {
                resolve(this.transitionTo('intern.tutorial.tutorial_' + user.get('tutorial_step_id')));
              }
            });

            this.loadFriends(me, response);
          });
        }
        else {
          console.log(response.error);
        }
      });
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
    // friends not yet playing the game
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
