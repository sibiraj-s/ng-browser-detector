const app = angular.module('app', ['ngBrowser']);

function BrowserDetectController($scope, appBrowser) {
  $scope.browserInfo = appBrowser.getBrowserInfo();
}

BrowserDetectController.$inject = ['$scope', 'appBrowser'];
app.controller('BrowserDetectController', BrowserDetectController);
