'use strict';

var app = angular.module('myApp', ['ngBrowser']);

app.controller('mainController', ['$scope', 'appBrowser', function ($scope, appBrowser) {
  $scope.appBrowser = appBrowser;
}]);
