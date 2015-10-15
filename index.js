/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cookie-consent-cnil',

  included: function(app) {
    this._super.included(app);
    app.import(app.bowerDirectory + '/jquery.cookie/jquery.cookie.js');
  }
};
