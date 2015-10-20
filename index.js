/* jshint node: true */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-cookie-consent-cnil',

  blueprintsPath:function(){
    return path.join(__dirname,'blueprints');
  },

  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/jquery.cookie/jquery.cookie.js');
  }
};
