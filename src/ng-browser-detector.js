import BrowserDetector from 'browser-dtector';

const $browser = ($window) => {
  const browserDetector = new BrowserDetector($window.navigator.userAgent);
  return browserDetector;
};

const $browserDetector = (appBrowser) => ({
  restrict: 'A',
  link: (scope, elm, attr) => {
    if (attr.browserDetector === 'attr') {
      // append browser details as attribute
      elm.attr('browser', appBrowser.getBrowserName());
      elm.attr('browser-version', `v-${appBrowser.getBrowserVersion()}`);
      elm.attr('platform', appBrowser.getPlatformName());
    } else {
      // append browser details to class
      elm.addClass(appBrowser.getPlatformName());
      elm.addClass(appBrowser.getBrowserName());
      elm.addClass(`v-${appBrowser.getBrowserVersion()}`);
    }
  },
});

$browser.$inject = ['$window'];
$browserDetector.$inject = ['appBrowser'];

angular.module('ngBrowser', [])
  .factory('appBrowser', $browser)
  .directive('browserDetector', $browserDetector);
