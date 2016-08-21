import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['for-loop'],

  numOfTimes: Ember.computed('times', function() {
    var times = this.get('times');
    var timesArr = [];
    for(var i = 0; i < times; i++) {
      timesArr.push(i);
    }
    return timesArr;
  })
});
