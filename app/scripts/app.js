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
      .when('/u/:username', {
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('HeaderCtrl', function ($scope, $location) {
      $scope.isActive = function (viewLocation) {
          return viewLocation === $location.path();
      };
  })
  .factory('Authentication', function ($cookies, $http, $location) {
      var Authentication = {
          login: login,
          getAuthenticatedAccount: getAuthenticatedAccount,
          isAuthenticated: isAuthenticated,
          setAuthenticatedAccount: setAuthenticatedAccount,
          unauthenticated: unauthenticated
      };

      return Authentication;

      function testlogin() {
          Authentication.setAuthenticatedAccount({user:'test'});

          $location.url('/u/test');
      }

      function login (email, password) {
          return $http.post('/api/v1/auth/login/', {
              email: email, password: password
          }).then(loginSuccesFn, loginErrorFn);

          function loginSuccess (data, status, headers, config) {
              Authentication.setAuthenticatedAccount(data.data);

              var auth = Authentication.getAuthenticatedAccount()

              $location.url('/u/' + auth.user);
          }

          function loginErrorFn (data, status, headers, config) {
              return;
          }
      }

      function getAuthenticatedAccount () {
          if (!$cookies.authenticatedAccount) {
              return;
          }

          return JSON.parse($cookies.authenticatedAccount);
      }

      function isAuthenticated () {
          return !!$cookies.authenticatedAccount;
      }

      function setAuthenticatedAccount (account) {
          $cookies.authenticatedAccount = JSON.stringify(account);
      }

      function unauthenticated () {
          delete $cookies.authenticatedAccount;
      }
  });
