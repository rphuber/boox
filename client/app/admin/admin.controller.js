'use strict';

angular.module('booxApp')
  .controller('AdminCtrl', function ($scope, $http, socket, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

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
        reservedBy: 'Available'
      });
      $scope.newBook = '';
    };

    $scope.deleteBook = function(book) {
      $http.delete('/api/books/' + book._id);
    };

    $scope.unReserveBook = function(book) {
      $http.put('/api/books/' + book._id, {
        available: true,
        reservedBy: 'Available',
        status: 'Available',
        dueDate: null
      });
    };

    $scope.checkOutBook = function(book) {

      $http.put('/api/books/' + book._id, {
        status: 'checkedOut',
        checkedOutBy: $scope.getCurrentUser().name,
        dueDate: new Date (+ new Date() + 12096e5)
      });
    };

    $scope.checkInBook = function(book) {

      $http.put('/api/books/' + book._id, {
        status: 'Available',
        reservedBy: 'Available',
        checkedOutBy: null,
        dueDate: null,
        available: true
      });
    };

  });
