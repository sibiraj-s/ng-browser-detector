import BrowserDetector from 'browser-dtector';

const $browser = ($window) => {
  const browserDetector = new BrowserDetector($window.navigator.userAgent);
  return browserDetector;
};


const $browserDetector = (appBrowser) => ({
  restrict: 'A',
  link: (_, elm, attr) => {
    function serialize(str) {
      if (typeof str === 'string') {
        return str.toLowerCase().replace(/ /g, '-');
      }

      return '';
    }

    const browserName = serialize(appBrowser.getBrowserName());
    const browserVersion = serialize(appBrowser.getBrowserVersion());
    const platformName = serialize(appBrowser.getPlatformName());

    if (attr.browserDetector === 'attr') {
      // append browser details as attribute
      elm.attr('browser', browserName);
      elm.attr('browser-version', `v-${browserVersion}`);
      elm.attr('platform', platformName);
    } else {
      // append browser details to class
      elm.addClass(browserName);
      elm.addClass(platformName);
      elm.addClass(`v-${browserVersion}`);
    }
  },
});

$browser.$inject = ['$window'];
$browserDetector.$inject = ['appBrowser'];

angular.module('ngBrowser', [])
  .factory('appBrowser', $browser)
  .directive('browserDetector', $browserDetector);
