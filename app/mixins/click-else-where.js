export default Ember.Mixin.create({
  onOutsideClick: Ember.K,

  handleOutsideClick: function(event) {
    let $element = this.$();
    let $target = $(event.target);
    if($element){
      if (!$target.parents($element).length) {
        console.log('click ouside component');
        this.onOutsideClick();
      }
      else {
        console.log('click inside component');
        //actions done by controller him self...
      }
    }
  },

  setupOutsideClickListener: Ember.on('didInsertElement', function() {
    let clickHandler = this.get('handleOutsideClick').bind(this);

    return Ember.$(document).on('click', clickHandler);
  }),

  removeOutsideClickListener: Ember.on('willDestroyElement', function() {
    let clickHandler = this.get('handleOutsideClick').bind(this);

    return Ember.$(document).off('click', clickHandler);
  })
});

