describe('controller', () => {
  beforeEach(module('app'));
  let $scope;

  beforeEach(inject(($injector) => {
    const $controller = $injector.get('$controller');
    const $rootScope = $injector.get('$rootScope');
    const appBrowser = $injector.get('appBrowser');

    $scope = $rootScope.$new();
    $controller('BrowserDetectController', { $scope, appBrowser });
  }));

  describe('$scope.appBrowser', () => {
    it('should initialize the controller properly', () => {
      expect(typeof $scope.appBrowser.parseUserAgent).toBe('function');
      expect($scope.appBrowser.getBrowserInfo()).toBeTruthy();
      expect(typeof $scope.appBrowser.getBrowserInfo()).toBe('object');
      expect(typeof $scope.appBrowser.getBrowserInfo().name).toBe('string');
    });
  });
});
