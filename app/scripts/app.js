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
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
      })
      .when('/list', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
      })
      .otherwise({templateUrl:'/404.html'});
  })
  .controller('HeaderCtrl', function ($scope, $cookies, $http, $location) {
      $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path();
      };

      $scope.logout = function () {
          $http.get('/user/logout.json').success(function (data) {
              if (data.code && data.code === '200') {
                  $cookies.profile = '';
                  $location.url('/');
              }
          });
      };
  });
