'use strict';

module.exports = {
  description: 'Adding jquery.cookie bower package dependency',
  
    normalizeEntityName: function() {}, // no-op since we're just adding dependencies


  afterInstall: function(options) {
    return this.addBowerPackageToProject('jquery.cookie');
  }
};
