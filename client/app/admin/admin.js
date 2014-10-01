'use strict';

angular.module('booxApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/adminFulfill', {
      	templateUrl: 'app/admin/adminFulfill.html',
      	controller: 'AdminCtrl'
      });
  });