import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  classNames: ['top-nav-bar'],

  links: [
    {
      is_fa_icon: true,
      icon: 'heartbeat',
      title: 'Monitor',
      target_url: 'intern.monitor'
    },
    {
      is_fa_icon: false,
      icon: 'C',
      title: 'Lab',
      target_url: 'intern.lab'
    },
    {
      is_fa_icon: true,
      icon: 'trophy',
      title: 'Leaderboard',
      target_url: 'intern.leaderboard'
    }
  ],

  actions: {
    logout: function() {
      this.get('session').invalidate();
    }
  }
});
