import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    start() {
      this.get('model.user').then(user => {
        user.updateTutorialStep({
          'tutorial_step_id': 2
        });
      });

      this.transitionToRoute('intern.lab.infections.create');
    }
  }
});
