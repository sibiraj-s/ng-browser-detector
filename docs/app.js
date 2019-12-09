const app = angular.module('app', ['ngBrowser']);

function BrowserDetectController($scope, appBrowser) {
  $scope.appBrowser = appBrowser;
}

BrowserDetectController.$inject = ['$scope', 'appBrowser'];
app.controller('BrowserDetectController', BrowserDetectController);
