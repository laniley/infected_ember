import Ember from 'ember';
import FacebookInitializer from 'infected-ember/initializers/facebook';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | facebook', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  FacebookInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
