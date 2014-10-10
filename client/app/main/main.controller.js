'use strict';

angular.module('booxApp')
  .controller('MainCtrl', function ($scope, $http, $location, socket, Auth) {

    $scope.awesomeThings = [];

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;


    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.books = [];

    $http.get('/api/books').success(function(books) {
      $scope.books = books;
      socket.syncUpdates('book', $scope.books);
    });

    $scope.addBook = function() {
      if($scope.newBook === '') {
        return;
      }
      
      $http.post('/api/books', {
        name: $scope.newBook.name,
        author: $scope.newBook.author,
        info: $scope.newBook.info,
        publishedDate: $scope.newBook.publishedDate,
        dateAdded: new Date(),
        genre: $scope.newBook.genre,
        available: true,
        reservedBy: 'Available',
        status: 'Available'
      });
      $scope.newBook = '';

    };

    $scope.reserveBook = function(book) {

      $http.put('/api/books/' + book._id, {
        available: false,
        reservedBy: $scope.getCurrentUser().name,
        status: 'Reserved'
      });

      $http.post('/api/messages', {
        to: 'Admin',
        from: $scope.getCurrentUser().name
      });
    };

    $scope.unReserveBook = function(book) {
      $http.put('/api/books/' + book._id, {
        available: true,
        reservedBy: 'Available',
        status: 'Available',
        dueDate: null
      });
    };

    $scope.deleteBook = function(book) {
      $http.delete('/api/books/' + book._id);
    };

    $scope.go = function ( path ) {
      $location.path( path );
    };


    // $http.delete('/api/books/' + book._id);


    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('book');
    });

  });
