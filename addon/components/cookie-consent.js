import Ember from 'ember';

export default Ember.Component.extend({

  // TODO need to be set in environnement !
  // This is the google ID given by google for a specific web site...
  gaProperty:'UA-XXXXXXXX-Y',
  
  // Have the user choose to be follow or not ?
  hasConsent:false,

  // Must the bannere be show ?
  isBannerNeeded:false,

  init:function(){
    this._super();
    let config = this.container.lookupFactory('config:environment');
    console.log(config);
    var gaProperty = config.ga_id;
    if (gaProperty != null) {
      console.log('google analytics id : ' + gaProperty);
      this.set('gaProperty',gaProperty);
    }
    else
    {
      throw new Error('Google ID for this website need to be set in environment.');
    }
    var hasConsent = Ember.$.cookie('hasConsent');
    Ember.Logger.log('hasConsent : ' + hasConsent);
    if(!hasConsent) {
      Ember.Logger.log("User has not decided yet.");
      this.set('isBannerNeeded',true);
    } else {
      if( hasConsent === "true" ){
        this.set('hasConsent',true);
        Ember.Logger.log("User agreed to be follow.");
        Ember.run(this,'startGoogleAnalytics');
      } else {
        this.set('hasConsent',false);
        Ember.Logger.log("User did not agreed to be follow.");
        Ember.run(this,'deleteGoogleAnalytics');
      }
    }
  },

  startGoogleAnalytics(){
    Ember.Logger.log('start google analytics');
    // add gas script on <head>
    let gas = document.createElement('script'); 
    gas.type = 'text/javascript'; 
    gas.async = true;
    gas.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(gas, s);

    gas = document.createElement('script'); 
    gas.type = 'text/javascript'; 
    gas.async = false;
    gas.text = "" +
      "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
      "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
      "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
      "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');" +
      "ga('create', '" + this.get('gaProperty') + "', 'auto');" +
      "ga('send', 'pageview');";
    s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(gas, s);
  },

  deleteGoogleAnalytics(){
    var cookieNames = ["__utma","__utmb","__utmc","__utmt","__utmv","__utmz","_ga","_gat"];
    for (var i=0; i<cookieNames.length; i++){
      Ember.$.removeCookie(cookieNames[i]);
    }
  },

  stopGoogleAnalytics(){
    Ember.Logger.log('stop google analytics');
    throw new Error('non implémenter');
  },

  actions:{
    consent:function(){
      Ember.Logger.log('user is ok to be follow');
      this.set('isBannerNeeded',false);
 
      // User is ok to be follow:
      var disableStr='ga-disable-' + this.get('gaProperty');
      Ember.$.removeCookie(disableStr,'true', { path: '/'} );
      
      // 13 months in milliseconds..
      var cookieTimeout = 33696000000;
      var date = new Date();
      date.setTime(date.getTime()+cookieTimeout);
      //var expirationDate = date.toGMTString();
      //Write it too a permanent cookie (valid 13 months) to memorize it:
      Ember.$.cookie('hasConsent','true', { path:'/'} /* expiration date failed on chromium... */);
      Ember.run(this,'startGoogleAnalytics');
    },

    decline:function(){
      Ember.Logger.log('user refuses to be follow');
      this.set('isBannerNeeded',false);
      Ember.$.cookie('hasConsent','false',{path:'/'});
      var disableStr='ga-disable-' + this.get('gaProperty');
      Ember.$.cookie(disableStr,'true', { path: '/'} );
      Ember.run(this,'deleteGoogleAnalytics');
    },

    // call from 'mentions légales' page during navigation...
    stop:function(){
      Ember.Logger.log('user decides to stop to be follow');
      Ember.$.cookie('hasConsent','false',{path:'/'});
      var disableStr='ga-disable-' + this.get('gaProperty');
      Ember.$.cookie(disableStr,'true', { path: '/'} );
      Ember.run(this,'stopGoogleAnalytics');
    }
  }
});

