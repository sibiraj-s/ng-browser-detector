const $browser = ($window) => {
  if (!$window.BrowserDtector || typeof $window.BrowserDtector !== 'function') {
    throw new Error('BrowserDtector not installed...');
  }

  return new $window.BrowserDtector($window.navigator.userAgent);
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

    const browserInfo = appBrowser.getBrowserInfo();

    const browserName = serialize(browserInfo.name);
    const browserVersion = serialize(browserInfo.version);
    const platformName = serialize(browserInfo.platform);

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
