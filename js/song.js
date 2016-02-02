(function(){ 
    var app=angular.module('song',[]);


    app.factory("httpService",function($http) {

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
    });
    app.controller("songcntrl",function(httpService,$scope,$http) {
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

})();