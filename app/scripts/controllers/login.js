'use strict';

/**
 * @ngdoc function
 * @name anchovyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the anchovyApp
 */
angular.module('anchovyApp')
    .controller('LoginCtrl', function ($scope, $location, Authentication) {
        if (Authentication.isAuthenticated()) {
            var auth = Authentication.getAuthenticatedAccount();
            $location.url('/u/' + auth.user);
        }

        $scope.testlogin = function () {
            Authentication.testlogin();
        }
    });
