import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('infection/skill-progress', 'Integration | Component | infection/skill progress', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{infection/skill-progress}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#infection/skill-progress}}
      template block text
    {{/infection/skill-progress}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
