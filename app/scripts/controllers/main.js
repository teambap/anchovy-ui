'use strict';

/**
 * @ngdoc function
 * @name anchovyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the anchovyApp
 */
angular.module('anchovyApp')
  .controller('MainCtrl', function ($scope, $location, $routeParams, $http) {
      $http.get('/item/list.json').success(listSuccessFn).error(listErrorFn);

      function listSuccessFn(data) {
          if (data.code && data.code === '200') {
              $scope.wishlist = data.data.items;
          } else {
              listErrorFn();
          }

          $scope.addWish = function () {
              var wishitem = {
                  name: $scope.wishitemname,
                  link: $scope.wishitemurl
              };

              $http.post('/item/add.json', wishitem).success(function (data) {
                  if (data.code && data.code === '200') {
                      $scope.wishlist.push(wishitem);
                      $scope.wishitemname = $scope.wishitemurl = '';
                  }
              });
          };

          $scope.removeWish = function (index) {
              $http.get('/item/' + $scope.wishlist[index].id + 'delete.json').success(function (data) {
                  if (data.code && data.code === '200') {
                      $scope.wishlist.splice(index, 1);
                  }
              });
          };
      }

      function listErrorFn() {
          $location.url('/unknown-error');
      }
  });
