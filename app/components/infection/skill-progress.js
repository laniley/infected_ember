import Ember from 'ember';

export default Ember.Component.extend({

  infection: null,
  skill: null,

  skill_progress: Ember.computed('infection.infection_skill_progresses.length', 'skill', function() {
      var progresses = this.get('infection.infection_skill_progresses');
      var progress = 0;
      progresses.forEach(prog => {
        console.log(prog.get('infection_skill.id') + '===' + this.get('skill.id'), prog.get('infection_skill.id') === this.get('skill.id'));
        if(prog.get('infection_skill.id') === this.get('skill.id')) {
          progress = prog.get('progress');
        }
      });
      return progress;
  }),

  costs: Ember.computed('skill_progress', function() {
    return this.get('skill_progress') + 1;
  }),

  tooltip: Ember.computed('skill_progress', function() {
    return `costs ${this.get('costs')} <img src=\"assets/images/helix_dark.png\" height=\"24px\" />`;
  })
});
