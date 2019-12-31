describe('<browser-detector> directive', () => {
  let $compile;
  let $rootScope;
  let $window;

  beforeEach(module('app'));

  beforeEach(inject(($injector) => {
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
    $window = $injector.get('$window');
  }));

  it('should add appropriate class names to the element', () => {
    const element = $compile('<div browser-detector></div>')($rootScope);
    $rootScope.$digest();
    expect(element.attr('class')).toContain('chrome');
    const browserVersion = element.attr('class').match(/v-[0-9.]*/);
    expect(browserVersion[0].length).toBeGreaterThan(2);
  });

  it('should add appropriate attributes to the element', () => {
    const element = $compile('<div browser-detector="attr"></div>')($rootScope);
    $rootScope.$digest();
    expect(element.attr('browser')).toContain('chrome');
    expect(element.attr('browser-version').length).toBeGreaterThan(2);
    expect(element.attr('platform')).toBeTruthy();
  });

  it('should throw if browser-dtector is not isntalled', () => {
    const { BrowserDtector } = $window;
    $window.BrowserDtector = undefined;
    expect(() => {
      $compile('<div browser-detector></div>')($rootScope);
      $rootScope.$digest();
    }).toThrowError(Error);
    $window.BrowserDtector = BrowserDtector;
  });
});
