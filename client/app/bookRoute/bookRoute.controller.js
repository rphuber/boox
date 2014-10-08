'use strict';

angular.module('booxApp')
  .controller('bookCtrl', function ($scope, $http, $routeParams, $location, Auth, socket) {
  	var bookId = $routeParams.id;

    $scope.isAdmin = Auth.isAdmin;

  	$scope.books = [];

    $http.get('/api/books').success(function(books) {
      $scope.books = books;
      $scope.book = books[bookId];
      socket.syncUpdates('book', $scope.books);
    });

    // $scope.updateBook = function(book) {

    //   $http.put('/api/books/' + book._id, book);

    // };

    $scope.updateBook = function(book) {

      $http.put('/api/books/' + book._id, book);
      $location.path( '/admin');
    };

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
        status: 'Available',
        reservedBy: 'Available'
      });
      $scope.newBook = '';
    };


  //   $scope.getCurrentUser = Auth.getCurrentUser;

  //   $scope.books = [];

  //   $http.get('/api/books').success(function(books) {
  //     $scope.books = books;
  //     socket.syncUpdates('book', $scope.books);
  //   });

  //   $scope.addBook = function() {
  //     if($scope.newBook === '') {
  //       return;
  //     }
      
  //     $http.post('/api/books', {
  //       name: $scope.newBook.name,
  //       author: $scope.newBook.author,
  //       info: $scope.newBook.info,
  //       publishedDate: $scope.newBook.publishedDate,
  //       dateAdded: new Date(),
  //       genre: $scope.newBook.genre,
  //       available: true,
  //       reservedBy: "Available"
  //     });
  //     $scope.newBook = '';
  //   };

  //   $scope.reserveBook = function(book) {

  //     $http.put('/api/books/' + book._id, {
  //       available: false,
  //       reservedBy: $scope.getCurrentUser().name
  //     });
  //   };

  //   $scope.unReserveBook = function(book) {
  //     $http.put('/api/books/' + book._id, {
  //       available: true,
  //       reservedBy: "Available"
  //     });
  //   };

  //   $scope.deleteBook = function(book) {
  //     $http.delete('/api/books/' + book._id);
  //   };


  //   // $http.delete('/api/books/' + book._id);


  //   $scope.$on('$destroy', function () {
  //     socket.unsyncUpdates('book');
  //   });
  });
