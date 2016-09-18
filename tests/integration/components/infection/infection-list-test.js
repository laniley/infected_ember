import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('infection/infection-list', 'Integration | Component | infection/infection list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{infection/infection-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#infection/infection-list}}
      template block text
    {{/infection/infection-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
