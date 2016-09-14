import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('intern', function() {
    this.route('welcome');
    this.route('infections', function() {
      this.route('infection', { path: '/:infection_id' });
      this.route('create');
    });
    this.route('monitor');
    this.route('leaderboard');
    this.route('lab', function() {
      this.route('infections');
      this.route('skills');
    });
  });
  this.route('login');
});

export default Router;
