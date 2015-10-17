# Ember-cookie-consent-cnil

This add-on is used to add the google Analytics cookie (new  version) with the cookie agreement of the user which is ask by the french CNIL.

To add it, install the npm module and add the {{cookie-consent}} component on top of the
application.hbs template.

This add-on take care to add the google code script inside the head of each page. So there nothing else to do for activation but this:

### IMPORTANT: Don't forget to set your google_id inside environment file with the variable name  "ga_id"  !!!

Once ga_id configured, the Google Analytics tracking code will be injected into your index.html file when user has agreed to be follow.
A mixin is provided for simple page view tracking inside of your Ember application. To use it,
include it inside your app/router.js file:

* import Ember from 'ember';
* import config from './config/environment';
* import cookieConsent from './mixins/cookie-consent';
*
* var Router = Ember.Router.extend(cookieConsent, {
*   location: config.locationType
* });
*
* Router.map(function() {
*   ...
* });

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

## TODO

* Lot of lot of things...

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
