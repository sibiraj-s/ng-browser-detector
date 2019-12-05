
const app = angular.module('app', ['ngBrowser']);

app.controller('BrowserDetectController', ['$scope', 'appBrowser', function BrowserDetectController($scope, appBrowser) {
  $scope.appBrowser = appBrowser;
}]);
