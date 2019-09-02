const $browser = ($window) => {
  const uaMatch = (userAgent) => {
    const ua = userAgent.toLowerCase();

    const match = /(edge)\/([\w.]+)/.exec(ua)
      || /(opr)[/]([\w.]+)/.exec(ua)
      || /(chrome)[/]([\w.]+)/.exec(ua)
      || /(version)(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(ua)
      || /(webkit)[/]([\w.]+).*(version)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(ua)
      || /(webkit)[/]([\w.]+)/.exec(ua)
      || /(opera)(?:.*version|)[/]([\w.]+)/.exec(ua)
      || /(msie) ([\w.]+)/.exec(ua)
      || (ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua))
      || (ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua))
      || [];

    const platformMatch = /(ipad)/.exec(ua)
      || /(iphone)/.exec(ua)
      || /(android)/.exec(ua)
      || /(windows phone)/.exec(ua)
      || /(win)/.exec(ua)
      || /(mac)/.exec(ua)
      || /(linux)/.exec(ua)
      || /(cros)/.exec(ua)
      || [];

    return {
      browser: match[5] || match[3] || match[1] || '',
      version: match[2] || match[4] || '0',
      versionNumber: match[4] || match[2] || '0',
      platform: platformMatch[0] || '',
    };
  };

  const matched = uaMatch($window.navigator.userAgent);
  const browser = {};

  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.versionNumber, 10);
  }
  if (matched.platform) {
    browser[matched.platform] = true;
  }
  if (browser.opr) {
    const opera = 'opera';
    matched.browser = opera;
    browser[opera] = true;
  }
  if (browser.rv) {
    const ie = 'msie';
    matched.browser = ie;
    browser[ie] = true;
  }
  if (browser.edge) {
    const edge = 'edge';
    matched.browser = edge;
    browser[edge] = true;
  }
  if (browser.safari && browser.android) {
    const android = 'android';
    matched.browser = android;
    browser[android] = true;
  }

  browser.name = matched.browser;
  browser.platform = matched.platform;

  return {
    get: () => browser,
    getName: () => browser.name,
    getPlatform: () => (browser.platform === 'win' ? 'windows' : browser.platform),
    getVersion: () => browser.versionNumber,
    isIE: () => (angular.isUndefined(browser.msie) ? null : browser.msie),
    isMobile: () => browser.android || browser.ipad || browser.iphone || browser['windows phone'],
    isDeskTop: () => browser.cros || browser.mac || browser.linux || browser.win,
    isWebKit: () => browser.chrome || browser.opr || browser.safari,
  };
};

const $browserDetector = (appBrowser) => ({
  restrict: 'A',
  link: (scope, elm, attr) => {
    if (attr.browserDetector === 'attr') {
      // append browser details as attribute
      elm.attr('browser', appBrowser.getName());
      elm.attr('browser-version', `v-${appBrowser.getVersion()}`);
      elm.attr('platform', appBrowser.getPlatform());
    } else {
      // append browser details to class
      elm.addClass(appBrowser.getPlatform());
      elm.addClass(appBrowser.getName());
      elm.addClass(`v-${appBrowser.getVersion()}`);
    }
  },
});

$browser.$inject = ['$window'];
$browserDetector.$inject = ['appBrowser'];

angular.module('ngBrowser', [])
  .factory('appBrowser', $browser)
  .directive('browserDetector', $browserDetector);
