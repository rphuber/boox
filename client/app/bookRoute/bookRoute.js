'use strict';

angular.module('booxApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/books', {
        templateUrl: 'app/bookRoute/bookRoute.html',
        controller: 'BookrouteCtrl'
      });
  });
