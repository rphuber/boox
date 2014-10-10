'use strict';

angular.module('booxApp')
  .controller('NavbarCtrl', function ($scope, $location, $http, socket, Auth) {
    $scope.menu = [
      {
        'title': 'Library',
        'link': '/'
      }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.messages = [];
    $scope.numberOfMessages = $scope.messages.length;

    $http.get('/api/messages').success(function(messages) {
      $scope.messages = messages;
      socket.syncUpdates('message', $scope.messages);
    });

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });