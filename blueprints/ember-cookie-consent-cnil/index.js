'use strict';

module.exports = {
  description: '',

  afterInstall: function(options) {
    return this.addBowerPackageToProject('jquery.cookie');
  }
};
