'use strict';

/**
 * @ngdoc function
 * @name anchovyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the anchovyApp
 */
angular.module('anchovyApp')
    .controller('LoginCtrl', function ($scope, $http, $location, $cookies) {
        $http.get('/user/info.json').success(function (data) {
            if (data.code && data.code === '200') {
                $cookies.profile = data.profile.profile_image_url;
                $location.url('/list');
            }
        });

        $scope.testlogin = function () {
            $cookies.profileimg = '';
            $location.url('/list');
        };
    });
