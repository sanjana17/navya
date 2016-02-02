'use strict';

angular.module('myApp', [])
    .controller('MovieController', function($scope, $http) {
      $scope.$watch('search', function() {
        fetch();
      });

      $scope.search = Sherlock Holmes;

      function fetch() {
        $http.get(httpwww.omdbapi.comt= + $scope.search + &tomatoes=true&plot=full)
            .then(function(response) {
              $scope.details = response.data;
            });

        $http.get(httpwww.omdbapi.coms= + $scope.search)
            .then(function(response) {
              $scope.related = response.data;
            });
      }

      $scope.update = function(movie) {
        $scope.search = movie.Title;
      };

      $scope.select = function() {
        this.setSelectionRange(0, this.value.length);
      }
    });