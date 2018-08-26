(function () {

  'use strict';

  var $browser = function ($window) {

    var matched, browser;
    var uaMatch = function (ua) {
      ua = ua.toLowerCase();
      var match = /(edge)\/([\w.]+)/.exec(ua)
        || /(opr)[\/]([\w.]+)/.exec(ua)
        || /(chrome)[ \/]([\w.]+)/.exec(ua)
        || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua)
        || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua)
        || /(webkit)[ \/]([\w.]+)/.exec(ua)
        || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)
        || /(msie) ([\w.]+)/.exec(ua)
        || ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua)
        || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

      var platform_match = /(ipad)/.exec(ua)
        || /(iphone)/.exec(ua)
        || /(android)/.exec(ua)
        || /(windows phone)/.exec(ua)
        || /(win)/.exec(ua)
        || /(mac)/.exec(ua)
        || /(linux)/.exec(ua)
        || /(cros)/.exec(ua) || [];
      return {
        browser: match[5] || match[3] || match[1] || '',
        version: match[2] || match[4] || '0',
        versionNumber: match[4] || match[2] || '0',
        platform: platform_match[0] || ''
      };
    };

    matched = uaMatch($window.navigator.userAgent);
    browser = {};
    if (matched.browser) {
      browser[matched.browser] = true;
      browser.version = matched.version;
      browser.versionNumber = parseInt(matched.versionNumber, 10);
    }
    if (matched.platform) {
      browser[matched.platform] = true;
    }
    if (browser.opr) {
      var opera = 'opera';
      matched.browser = opera;
      browser[opera] = true;
    }
    if (browser.rv) {
      var ie = 'msie';
      matched.browser = ie;
      browser[ie] = true;
    }
    if (browser.edge) {
      var edge = 'edge';
      matched.browser = edge;
      browser[edge] = true;
    }
    if (browser.safari && browser.android) {
      var android = 'android';
      matched.browser = android;
      browser[android] = true;
    }
    browser.name = matched.browser;
    browser.platform = matched.platform;

    return {
      get: function () {
        return browser;
      },
      getName: function () {
        return browser.name;
      },
      getPlatform: function () {
        if (browser.platform === 'win') {
          browser.platform = 'windows';
        }
        return browser.platform;
      },
      getVersion: function () {
        return browser.versionNumber;
      },
      isIE: function () {
        return angular.isUndefined(browser.msie) ? null : browser.msie;
      },
      isMobile: function () {
        return browser.android || browser.ipad || browser.iphone || browser['windows phone'];
      },
      isDeskTop: function () {
        return browser.cros || browser.mac || browser.linux || browser.win;
      },
      isWebKit: function () {
        return browser.chrome || browser.opr || browser.safari;
      }
    };

  };

  var $browserDetector = function (appBrowser) {

    return {
      restrict: 'A',
      link: function (scope, elm, attr) {

        if (attr.browserDetector == 'attr') {
          // append browser details as attribute
          elm.attr('browser', appBrowser.getName());
          elm.attr('browser-version', 'v-' + appBrowser.getVersion());
          elm.attr('platform', appBrowser.getPlatform());

        } else {
          // append browser details to class
          elm.addClass(appBrowser.getPlatform());
          elm.addClass(appBrowser.getName());
          elm.addClass('v-' + appBrowser.getVersion());

        }
      }
    };
  };

  $browser.$inject = ['$window'];
  $browserDetector.$inject = ['appBrowser'];

  angular.module('ngBrowser', [])
    .factory('appBrowser', $browser)
    .directive('browserDetector', $browserDetector);
})();
