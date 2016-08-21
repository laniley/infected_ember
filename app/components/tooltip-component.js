import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    var id = this.elementId;
    Ember.$('#' + id + ' > .tooltip > .tooltip-label').mouseover(function() {
      Ember.$('#' + id + ' > .tooltip > .tooltip-text').css('visibility', 'visible');
    });
    Ember.$('#' + id + ' > .tooltip > .tooltip-label').mouseout(function() {
      Ember.$('#' + id + ' > .tooltip > .tooltip-text').css('visibility', 'hidden');
    });
  },
});
