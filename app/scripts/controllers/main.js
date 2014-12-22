'use strict';

/**
 * @ngdoc function
 * @name anchovyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the anchovyApp
 */
angular.module('anchovyApp')
  .controller('MainCtrl', function ($scope, $location, $routeParams, localStorageService, Authentication) {
      var username = $routeParams.username;

      if (!Authentication.isAuthenticated()) {
          $location.url('/');
      }

      $scope.wishlist = localStorageService.get('wishlist') || [];

      $scope.$watch('wishlist', function () {
          localStorageService.set('wishlist', $scope.wishlist);
      }, true);

      $scope.addWish = function () {
          $scope.wishlist.push($scope.wishitem);
          $scope.wishitem = '';
      };

      $scope.removeWish = function (index) {
          $scope.wishlist.splice(index, 1);
      };
  });
