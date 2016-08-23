import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('infection/skill-component', 'Integration | Component | infection/skill component', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{infection/skill-component}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#infection/skill-component}}
      template block text
    {{/infection/skill-component}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
