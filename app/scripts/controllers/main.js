angular.module('trackerApp')
  .controller('MainCtrl', function ($scope, github) {
    $scope.commits;
    github.commits().then(function(response){
      $scope.commits = response
    });
  });
