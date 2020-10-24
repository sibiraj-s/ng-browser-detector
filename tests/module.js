const app = angular.module('app', ['ngBrowser']);

const BrowserDetectController = function ($scope, appBrowser) {
  $scope.appBrowser = appBrowser;
};

BrowserDetectController.$inject = ['$scope', 'appBrowser'];
app.controller('BrowserDetectController', BrowserDetectController);
