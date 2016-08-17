import Ember from 'ember';
import { PerfectScrollbarMixin } from 'ember-perfect-scrollbar';

export default Ember.Component.extend(PerfectScrollbarMixin, {

  classNames: ['main-container'],
  classNameBindings: ['classes'],

  classes: '',

  perfectScrollbarOptions: {
    suppressScrollX: true
  }
});
