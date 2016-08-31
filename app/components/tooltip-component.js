import Ember from 'ember';

export default Ember.Component.extend({

  cssClasses: '',

  didInsertElement() {
    var id = this.elementId;
    var label = Ember.$('#' + id + ' > .tooltip > .tooltip-label');
    var text = Ember.$('#' + id + ' > .tooltip > .tooltip-text');

    label.mouseover(function() {
      text.css('visibility', 'visible');
    });
    label.mouseout(function() {
      text.css('visibility', 'hidden');
    });

    var text_width = text.outerWidth();

    if(Ember.$('#' + id + ' > .tooltip').hasClass('bottom')) {
      text.css('margin-left', -1 *( text_width/2 ));
    }
  },
});
