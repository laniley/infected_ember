import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('top-nav-bar/dropdown-title', 'Integration | Component | top nav bar/dropdown title', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{top-nav-bar/dropdown-title}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#top-nav-bar/dropdown-title}}
      template block text
    {{/top-nav-bar/dropdown-title}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
