import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('intern', function() {
    this.route('welcome');
    this.route('infection', function() {
      this.route('create');
    });
  });
  this.route('login');
});

export default Router;
