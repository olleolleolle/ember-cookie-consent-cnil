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
    var gaProperty = config.ga_id;
    
    // check google id in environment:
    if (gaProperty != null) {
      this.set('gaProperty',gaProperty);
    }
    else
    {
      throw new Error('Google ID for this website need to be set in the "ga_id" environment variable.');
    }

    var dnt = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack;
    if( (dnt) ? (dnt || dnt === "yes" || dnt === 1 ||  dnt === "1") : false ){
      console.log('DEBUG: do not track.' + dnt);
      // check it is donottrack !
      this.set('isBannerNeeded',false);
      this.set('hasConsent',false);
    }
    else if (navigator.userAgent.indexOf("Prerender") > -1){
      console.log('DEBUG: it is the prerender.');
      // check it's the prerender !
      this.set('isBannerNeeded',false);
      this.set('hasConsent',false);
    } else {
      var hasConsent = Ember.$.cookie('hasConsent');
      if(!hasConsent) {
        this.set('isBannerNeeded',true);
        console.log('DEBUG: banner is needed:'); 
      } else {
        if( hasConsent === "true" ){
          console.log('DEBUG: user consents');
          this.set('hasConsent',true);
          Ember.run(this,'startGoogleAnalytics');
        } else {
          console.log('DEBUG: user declines');
          this.set('hasConsent',false);
          Ember.run(this,'deleteGoogleAnalytics');
        }
      }
    }
  },

  startGoogleAnalytics(){
    // add gas script on <head>
    //let gas = document.createElement('script');
    //gas.id = '
    //gas.type = 'text/javascript'; 
    //gas.async = true;
    //gas.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    //var s = document.getElementsByTagName('script')[0]; 
    //s.parentNode.insertBefore(gas, s);

    let gas = document.createElement('script'); 
    gas.id = 'google_analytics';
    gas.type = 'text/javascript'; 
    gas.async = false;
    gas.text = "" +
      "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
      "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
      "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
      "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');" +
      "ga('create', '" + this.get('gaProperty') + "', 'auto');" +
      "ga('send', 'pageview');";
    let s = document.getElementsByTagName('script')[0]; 
    s.parentNode.insertBefore(gas, s);
  },

  deleteGoogleAnalytics(){
    // delete google script:
    let google_script = Ember.$['google_analyics'];
    if(google_script){
      google_script.remove();
    }
    // delete google cookie:
    let cookieNames = ["__utma","__utmb","__utmc","__utmt","__utmv","__utmz","_ga","_gat"];
    for (let i=0; i<cookieNames.length; i++){
      Ember.$.removeCookie(cookieNames[i]);
    }
  },

  actions:{
    consent:function(){
      this.set('isBannerNeeded',false);
 
      // User is ok to be follow:
      var disableStr='ga-disable-' + this.get('gaProperty');
      Ember.$.removeCookie(disableStr,'true', { path: '/'} );

      // 13 months in milliseconds..
      var cookieTimeout = 33696000000;
      var expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime()+cookieTimeout);
      //Write it too a permanent cookie (valid 13 months) to memorize it:
      Ember.$.cookie("hasConsent","true",{ expires:expirationDate, path:'/'});
      Ember.run(this,'startGoogleAnalytics');
    },

    decline:function(){
      this.set('isBannerNeeded',false);
      
      // 13 months in milliseconds..
      var cookieTimeout = 33696000000;
      var expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime()+cookieTimeout);
      //Write it too a permanent cookie (valid 13 months) to memorize it:
      Ember.$.cookie("hasConsent","false",{ expires:expirationDate, path:'/'});
      var disableStr='ga-disable-' + this.get('gaProperty');
      Ember.$.cookie(disableStr,'true', { path: '/'} );
      Ember.run(this,'deleteGoogleAnalytics');
    }
  }
});

