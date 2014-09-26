'use strict';

describe('Controller: BookrouteCtrl', function () {

  // load the controller's module
  beforeEach(module('booxApp'));

  var BookrouteCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookrouteCtrl = $controller('BookrouteCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
