'use strict';

/**
 * @ngdoc overview
 * @name anchovyApp
 * @description
 * # anchovyApp
 *
 * Main module of the application.
 */
angular
  .module('anchovyApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
      localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('HeaderCtrl', function ($scope, $location) {
      $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path();
      };
  });
