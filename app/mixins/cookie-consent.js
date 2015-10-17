import Ember from 'ember';

export default Ember.Mixin.create({
  actions:{
    didTransition:function() {
      let ga = window['ga'];
      if(ga){
        let page = this.get('page');
        let title = this.get('title');
        ga('send', 'pageview', { page: page, title: title });
      }
    }
  }
});

