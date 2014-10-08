'use strict';

angular.module('booxApp')
  .controller('BookswapCtrl', function ($scope, Auth, $http, $routeParams, $location, socket) {

    $scope.isAdmin = Auth.isAdmin;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;

    var swapBookId = $routeParams.id;

    $scope.swapBooks = [];

    $http.get('/api/bookswaps').success(function(bookswaps) {
      $scope.swapBooks = bookswaps;
      $scope.thisBook = bookswaps[swapBookId];
      socket.syncUpdates('bookswap', $scope.swapBooks);
    });

    $scope.addSwapBook = function() {
      if($scope.newBook === '') {
        return;
      }
      
      $http.post('/api/bookswaps', {
        name: $scope.newBook.name,
        author: $scope.newBook.author,
        info: $scope.newBook.info,
        publishedDate: $scope.newBook.publishedDate,
        dateAdded: new Date(),
        genre: $scope.newBook.genre,
        available: true,
        owner: $scope.getCurrentUser().name,
        status: 'Available'
      });
      $scope.newBook = '';
    };

    $scope.updateSwapBook = function(book) {

      $http.put('/api/bookswaps/' + book._id, book);
      $location.path( '/bookswap');
    };

    $scope.swapABook = function(book) {

      $http.put('/api/bookswaps/' + book._id, {
        available: false,
        reservedBy: $scope.getCurrentUser().name,
        status: 'Requested'
      });
    };

    $scope.unSwapBook = function(book) {
      $http.put('/api/bookswaps/' + book._id, {
        available: true,
        reservedBy: 'Available',
        status: 'Available'
      });
    };

    $scope.deleteSwapBook = function(book) {
      $http.delete('/api/bookswaps/' + book._id);
    };

    $scope.go = function ( path ) {
      $location.path( path );
    };


    // $http.delete('/api/books/' + book._id);


    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('book');
    });

  });
