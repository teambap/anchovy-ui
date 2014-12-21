'use strict';

/**
 * @ngdoc function
 * @name anchovyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the anchovyApp
 */
angular.module('anchovyApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
      var wishlistInStore = localStorageService.get('wishlist');

      $scope.wishlist = wishlistInStore || [];

      $scope.$watch('wishlist', function () {
          localStorageService.set('wishtlist', $scope.wishlist);
      }, true);

    $scope.addWish = function () {
        $scope.wishlist.push($scope.wishitem);
        $scope.wishitem = '';
    };

    $scope.removeWish = function (index) {
        $scope.wishlist.splice(index, 1);
    };
  });
