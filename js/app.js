'use strict';
angular.module('myapp', ['ngRoute'])
    .config(['$routeProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/song', {
                    templateUrl: 'song.html'
                })
                .when('/movie', {
                    templateUrl: 'movie.html'
                });


        }])
        .controller('MovieController', function($routeParams,$scope, $http) {
        this.params=$routeParams;
        $scope.call= function(search) {
            $http.get("http://www.omdbapi.com/?t=" +search)
                .then(function(response) {
                    $scope.details = response.data;
                });

            $http.get("http://www.omdbapi.com/?s=" +search)
                .then(function(response) {
                    $scope.related = response.data;
                });
        };

        



            $scope.update = function(movie) {
            $scope.search = movie.Title;
        };

            $scope.select = function() {
            this.setSelectionRange(0, this.value.length);
        }
    })
    .factory("httpService",function($http) {

    return {
        getalbums: function () {
            var album = "https://freemusicarchive.org/api/get/albums.json?api_key=4CEU5MLWCWUU0RWJ"
            return $http.get(album).then(function (response) {
                return response.data;
            });
        },
        gettracks: function (gettrack) {
            var track = "https://freemusicarchive.org/api/get/tracks.json?api_key=4CEU5MLWCWUU0RWJ&album_id="+gettrack;
            return $http.get(track).then(function (response) {
                return response.data;
            });
        },
        getartists: function (getartists) {
            var artist = "https://freemusicarchive.org/api/get/artists.json?api_key=4CEU5MLWCWUU0RWJ&artist_id="+getartists;
            return $http.get(artist).then(function (response) {
                return response.data;
            });
        }
    }
})
    .controller("songcntrl",function(httpService,$scope,$http,$routeParams) {
        this.params=$routeParams;
    $scope.data1={};
    $scope.data2={};
    httpService.getalbums().then(function(response){
        $scope.data1=response;

    });
    console.log($scope.selection);
    $scope.call=function(val){
        httpService.gettracks(val).then(function(response){
            $scope.data2=response;
            console.log(response);

        });
        $scope.getArtist=function(id){
            httpService.getartists(id).then(function(response){
                console.log(response);
                alert(response.dataset.artist_bio);
            });
        }
    }


});
