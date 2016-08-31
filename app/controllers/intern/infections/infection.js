import Ember from 'ember';

export default Ember.Controller.extend({

  save_button_is_active: Ember.computed('model.infection_skill_progresses.@each.marked_to_unlock', function() {
    let is_active = false;
    this.get('model').get('infection_skill_progresses').forEach(progress => {
      if(progress.get('marked_to_unlock') > 0) {
        is_active = true;
      }
    });
    return is_active;
  }),

  actions: {
    save() {
      if(this.get('save_button_is_active')) {
        this.get('model').get('infection_skill_progresses').forEach(progress => {
          if(progress.get('hasDirtyAttributes')) {
            progress.set('progress', progress.get('progress') + progress.get('marked_to_unlock'));
            progress.set('marked_to_unlock', 0);
            progress.save();
          }
        });
      }
    }
  }
});
