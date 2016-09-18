import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Controller.extend({
  infection: null,
  error: '',
  nameInput: '',
  newInfectionNameStatus: 'not_correct',
  visible: false,
  timeout: null,

  disabled: Ember.computed('requirementsForNewInfectionFulfilled', function() {
    if(this.get('requirementsForNewInfectionFulfilled')) {
      return "";
    }
    else {
      return "disabled";
    }
  }),

  missing_requirements_message: Ember.computed('nameInput', 'newInfectionNameStatus', function() {
    if(this.get('nameInput.length') < 3) {
      return 'The name must contain a minimum of 3 characters.';
    }
    else if(this.get('containsOnlyValidChars')) {
      return 'The name can only contain letters (A-Z), numbers (0-9), dashes (-), underscores (_), apostrophes (\'), whitespaces ( ), and periods (.)';
    }
    else if(this.get('nameInput.length') > 50) {
      return 'The name cannot be longer than 50 characters.';
    }
    else if(this.get('newInfectionNameStatus') === 'already_in_use') {
      return 'This name is already in use.';
    }
  }),

  containsOnlyValidChars: Ember.computed('nameInput', function() {
    if(/[^A-Za-z0-9_\-. ]/g.test(this.get('nameInput'))) {
      return true;
    }
    else {
      return false;
    }
  }),

  requirementsForNewInfectionFulfilled: Ember.computed('newInfectionNameStatus', function() {
    if(this.get('newInfectionNameStatus') === 'correct') {
      return true;
    }
    else {
      return false;
    }
  }),

  nameStatusIconSpin: Ember.computed('newInfectionNameStatus', function() {
    if(this.get('newInfectionNameStatus') === 'unknown') {
      return true;
    }
    else {
      return false;
    }
  }),

  nameDidChange: Ember.observer('nameInput', function(){
    window.clearTimeout(this.get('timeout'));
    this.set('visible', true);
    this.set('error', '');
    this.set('newInfectionNameStatus', 'unknown');
    var timeout = window.setTimeout(() => {
      if(this.get('nameInput.length') > 2 && !this.get('containsOnlyValidChars') && this.get('nameInput.length') <= 50) {
          return DS.PromiseObject.create({
            promise: this.store.query('infection', {
                'name': this.get('nameInput')
            }).then(results => {
                if(Ember.isEmpty(results)) {
                  this.set('newInfectionNameStatus', 'correct');
                }
                else {
                  this.set('newInfectionNameStatus', 'already_in_use');
                }
            })
        });
      }
      else {
        this.set('newInfectionNameStatus', 'not_correct');
      }
    }, 1500);
    this.set('timeout', timeout);
  }),

  actions: {
    back() {
      history.back();
    },
    save() {
      if(this.get('newInfectionNameStatus') === 'correct') {
        this.set('newInfectionNameStatus', 'unknown');
        this.get('model').get('user').then(user => {
          var infection = this.store.createRecord('infection', {
            'user': user,
            'name': this.get('nameInput')
          });
          infection.save().then(
            // on success
            () => {
              this.set('newInfectionNameStatus', 'saved');
              this.set('infection', infection);
              this.transitionToRoute('intern.lab.infections.infection', infection, { queryParams: { section: 'skills' }});
            },
            // on failure
            response => {
              infection.destroy();
              this.set('newInfectionNameStatus', 'not_correct');
              console.log(this.get('newInfectionNameStatus'), response.errors[0].detail);
              this.set('error', response.errors[0].detail);
            }
          );
        });
      }
    },
  }
});
