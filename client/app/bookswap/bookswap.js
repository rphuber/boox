'use strict';

angular.module('booxApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookswap', {
        templateUrl: 'app/bookswap/bookswap.html',
        controller: 'BookswapCtrl'
      }).when('/bookswap/:id', {
      	templateUrl: 'app/bookswap/bookSwapDetail.html',
      	controller: 'BookswapCtrl'
      })
      .when('/bookswapEdit/:id', {
        templateUrl: 'app/bookswap/bookSwapEdit.html',
        controller: 'BookswapCtrl'
      })
      .when('/bookswapAdd', {
      	templateUrl: 'app/bookswap/bookSwapAdd.html',
      	controller: 'BookswapCtrl'
      });
  });
