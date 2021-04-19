declare var zip: any;
// declare var NoSleep: any;

var NoSleep = require("./nosleep.js");
require("./broadcastchannel.js");
// var angularLogglyLogger = require("../../node_modules/angular-loggly-logger/angular-loggly-logger.js")();
// /Users/ronezra/projects/learni/app/node_modules/angular-loggly-logger/index.js

/*@ngInject*/
export function Run($translate, angularLoad, DeviceUtilities, Localytics, $window,
  $document, $cordovaSplashscreen, $cordovaGlobalization, amMoment, $state, $location, ENV, LogOut) {
  function loadStyle(language) {
    let direction = language === 'he' ? 'rtl' : 'ltr';
    return require(`bundle!./../styles/app-${direction}.scss`);
  }





  var bc = new BroadcastChannel('difrrent_tab');

  bc.postMessage("The user is conected from another tab");

  bc.onmessage = function (e) {
    
    if ($state.params.allowNewWindow) {
      $state.params.allowNewWindow = false;
      return;
    }

    console.log('Received: ' + e.data);
    LogOut.logOut();
    window.location.replace('http://google.com');
  };




  console.log('version no cache 2');
  function setLanguage(languageKey) {
    var language = languageKey.split('-')[0];
    $translate.use(language);
    amMoment.changeLocale(language);
    return language;
  }

  function loadZipJs() {
    angularLoad.loadScript('3rdparty/zip/zip.js').then(() =>
      angularLoad.loadScript('3rdparty/zip/zip-fs.js')).then(() =>
        angularLoad.loadScript('3rdparty/zip/zip-ext.js')).then(() => {
          if (typeof (zip) !== 'undefined' && typeof (zip.workerScriptsPath) !== 'undefined') {
            zip.workerScriptsPath = '3rdparty/zip/';
          }
        });
  }

  //No need for it now TODO
  // function loadCordova() {
  //   $document[0].addEventListener('deviceready', () => {
  //     let FastClick = require('fastclick');
  //     FastClick.attach($document[0].body);
  //     Localytics.init();

  //     $cordovaGlobalization.getPreferredLanguage()
  //       .then((preferredLanguage) => loadStyle(setLanguage(preferredLanguage.value)))
  //       .finally(() =>
  //         // The stylesheet is loaded by now, but the browser has not necessarily rendered it...
  //         setTimeout(() => $cordovaSplashscreen.hide(), 1000));

  //     if (DeviceUtilities.isWindows()) {
  //       loadZipJs();
  //     }
  //   });
  // }

  // function loadChromeApp() {
  //   loadStyle(setLanguage($window.navigator.language));
  //   DeviceUtilities.disableBackSpace();
  //   loadZipJs();
  // }

  // function run() {
  //   if (DeviceUtilities.isCordovaSupported()) {
  //     loadCordova();
  //   } else {
  //     loadChromeApp();
  //   }
  // }

  function run() {
    loadStyle(setLanguage('he'));
    // initNoSleep();
    console.log('environment : ' + ENV.environment);



    if (window.location.hostname !== "localhost") {
      initRefreshAndBackButtonHack();
      //Hack
      if (!localStorage.getItem('isHackVersion')) {
        localStorage.setItem('isHackVersion', 'true');
        //localStorage.clear();
      }

    }
    initNoSleep();
  }



  run();


  function initRefreshAndBackButtonHack() {
    // fixBackButton();

    window.onbeforeunload = function () {
      return "Are you sure?"
    }


    //Hack : To solve refresh problems
    if (performance.navigation.type == 1) {
      $location.path('/');
      console.log('the page as refresh')
    } else {
    }

  }

  function fixBackButton() {
    $document.innerDocClick = true;

    document.addEventListener("mouseover", function () {
      //User's mouse is inside the page.
      $document.innerDocClick = true;
    });

    document.addEventListener("mouseleave", function () {
      //User's mouse has left the page.
      $document.innerDocClick = false;
    });

    window.onhashchange = function () {
      if ($document.innerDocClick) {
        //Your own in-page mechanism triggered the hash change
      } else {
        //Browser back button was clicked
        window.alert('Back button will refresh the app');
        $location.path('/');
      }
    }
  }

  //For mobile not get in sleep mode
  function initNoSleep() {
    var noSleep = new NoSleep();

    function enableNoSleep() {
      noSleep.enable();
      console.log('noSleep.enable();')
      document.removeEventListener('click', enableNoSleep, false);
    }

    document.addEventListener('click', enableNoSleep, false);
  }


}
