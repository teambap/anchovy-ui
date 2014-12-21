'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('anchovyUiApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have no items to start', function () {
    expect(scope.wishlist.length).toBe(0);
  });

  it('should add then remove an item from the list', function () {
      scope.wishitem = 'Test 1';
      scope.addWish();
      expect(scope.wishlist.length).toBe(1);
      scope.removeWish(0);
      expect(scope.wishlist.length).toBe(0);
  });
});
