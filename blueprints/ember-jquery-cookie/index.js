'use strict';

module.exports = {
  description: ''

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

   afterInstall: function(options) {
     // Perform extra work here.
     return this.addBowerPackageToProject('jquery.cookie');
   }
};