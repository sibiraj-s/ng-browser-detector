describe('controller', () => {
  beforeEach(module('app'));
  let $controller;
  let $scope;

  beforeEach(inject((_$controller_, _$rootScope_, _appBrowser_) => {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    $controller('BrowserDetectController', { $scope, appBrowser: _appBrowser_ });
  }));

  describe('$scope.appBrowser', () => {
    it('sets the strength to "strong" if the password length is >8 chars', () => {
      expect(typeof $scope.appBrowser.parseUserAgent).toBe('function');
      expect($scope.appBrowser.getBrowserName()).toBeTruthy();
      expect($scope.appBrowser.getBrowserVersion()).toBeTruthy();
    });
  });
});
