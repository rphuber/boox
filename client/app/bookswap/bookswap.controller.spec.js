'use strict';

describe('Controller: BookswapCtrl', function () {

  // load the controller's module
  beforeEach(module('booxApp'));
  beforeEach(module('socketMock'));

  var BookswapCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookswapCtrl = $controller('BookswapCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(5).toEqual(5);
  });
});
