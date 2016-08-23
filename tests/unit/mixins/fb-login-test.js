import Ember from 'ember';
import FbLoginMixin from 'infected-ember/mixins/fb-login';
import { module, test } from 'qunit';

module('Unit | Mixin | fb login');

// Replace this with your real tests.
test('it works', function(assert) {
  let FbLoginObject = Ember.Object.extend(FbLoginMixin);
  let subject = FbLoginObject.create();
  assert.ok(subject);
});
