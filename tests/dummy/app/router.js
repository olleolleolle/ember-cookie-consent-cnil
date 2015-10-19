import Ember from 'ember';
import config from './config/environment';
import cookieConsent from './mixins/cookie-consent';

var Router = Ember.Router.extend(cookieConsent,{
  location: config.locationType
});

Router.map(function() {
  this.route('profile',{});
  this.route('mentionslegales',{});
});

export default Router;
