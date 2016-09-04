import Ember from 'ember';

export default Ember.Component.extend({

  infection: null,
  skill: null,

  skill_progress: Ember.computed('infection.infection_skill_progresses.length', 'skill', function() {
    return this.get('infection.infection_skill_progresses').filter(progress => {
      return progress.get('infection_skill.id') === this.get('skill.id');
    })[0];
  }),

  skill_progress_points: Ember.computed('skill_progress.progress', function () {
    return this.get('skill_progress.progress');
  }),

  marked_to_unlock: Ember.computed('skill_progress.marked_to_unlock', function () {
    return this.get('skill_progress.progress') + this.get('skill_progress.marked_to_unlock');
  }),

  costs: Ember.computed('marked_to_unlock', function() {
    return this.get('marked_to_unlock') + 1;
  }),

  activate_button_is_active : Ember.computed('infection.user.eps', 'costs', function() {
    return this.get('infection.user.eps') >= this.get('costs');
  }),

  activate_button_class: Ember.computed('activate_button_is_active', function() {
    if(this.get('activate_button_is_active')) {
      return "menu-icon active";
    }
    else {
      return "menu-icon inactive";
    }
  }),

  activate_button_src: Ember.computed('activate_button_is_active', function() {
    if(this.get('activate_button_is_active')) {
      return "assets/images/plus.png";
    }
    else {
      return "assets/images/plus_inactive.png";
    }
  }),

  deactivate_button_is_active: Ember.computed('skill_progress.marked_to_unlock', function() {
    return this.get('skill_progress.marked_to_unlock') > 0;
  }),

  deactivate_button_class: Ember.computed('deactivate_button_is_active', function() {
    if(this.get('deactivate_button_is_active') > 0) {
      return "menu-icon active";
    }
    else {
      return "menu-icon inactive";
    }
  }),

  deactivate_button_src: Ember.computed('deactivate_button_is_active', function() {
    if(this.get('deactivate_button_is_active') > 0) {
      return "assets/images/minus.png";
    }
    else {
      return "assets/images/minus_inactive.png";
    }
  }),

  activate_tooltip: Ember.computed('costs', function() {
    return `costs ${this.get('costs')} <img src=\"assets/images/helix_dark.png\" height=\"24px\" />`;
  }),

  deactivate_tooltip: Ember.computed('costs', function() {
    return `get back ${this.get('costs') - 1} <img src=\"assets/images/helix_dark.png\" height=\"24px\" />`;
  }),

  actions: {
    activate() {
      let new_eps = this.get('infection.user.eps') - this.get('costs');
      if(new_eps >= 0) {
        let skill_progress = this.get('skill_progress');
        this.set('infection.user.eps', new_eps);
        skill_progress.set('marked_to_unlock', skill_progress.get('marked_to_unlock') + 1);
      }
    },
    deactivate() {
      let skill_progress = this.get('skill_progress');
      let new_marked_to_unlock = skill_progress.get('marked_to_unlock') - 1;
      if(new_marked_to_unlock >= 0) {
        this.set('infection.user.eps', this.get('infection.user.eps') + (this.get('costs') - 1));
        skill_progress.set('marked_to_unlock', skill_progress.get('marked_to_unlock') - 1);
      }
    },
  }
});
