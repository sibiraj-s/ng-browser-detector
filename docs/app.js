
const app = angular.module('app', ['ngBrowser']);

function BrowserDetectController($scope, appBrowser) {
  $scope.appBrowser = appBrowser;
}

app.controller('BrowserDetectController', ['$scope', 'appBrowser', BrowserDetectController]);
