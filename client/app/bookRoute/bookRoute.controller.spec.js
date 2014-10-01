'use strict';

describe('Controller: bookCtrl', function () {

  // load the controller's module
  beforeEach(module('booxApp'));
  beforeEach(module('socketMock'));

  var BookrouteCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookrouteCtrl = $controller('bookCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(2).toEqual(2);
  });
});
