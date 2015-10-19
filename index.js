/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cookie-consent-cnil',

  blueprintsPath:function(){
    return path.join(_dirname,'blueprints');
  },

  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/jquery.cookie/jquery.cookie.js');
  }
};
