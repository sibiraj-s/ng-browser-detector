describe('<browser-detector> directive', () => {
  let $compile;
  let $rootScope;

  // Load the myApp module, which contains the directive
  beforeEach(module('app'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject((_$compile_, _$rootScope_) => {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
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
});
