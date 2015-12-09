
    var app = angular.module('wApp', []);
    app.controller('weatherController', ['$scope', 'weatherService', function ($scope, weatherService) {
    var mysrclat = 0;
    var mysrclong = 0;
    $scope.getLocalWeather = function(){

    getCurrentLocation();
    if(mysrclat !== 0 && mysrclong !== 0)
    fetchWeather(mysrclat,mysrclong);
    }

    function fetchWeather(lat,long) {
    weatherService.getWeather(lat,long).then(function(data){
    $scope.place = data;
    }); 
    }
    fetchWeather(52.4851659,13.4383258);
    function getCurrentLocation(){
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
    mysrclat = position.coords.latitude;
    mysrclong = position.coords.longitude;
    console.log(mysrclat);
    console.log(mysrclong);
    });
    }
    }
    }]);

    app.factory('weatherService', ['$http', '$q', function ($http, $q){
    function getWeather (lat,long) {
    var deferred = $q.defer();
    $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.placefinder%20WHERE%20text%3D%22"+lat+"%2C"+long+"%22%20and%20gflags%3D%22R%22)&format=json&callback=")
    .success(function(data){
    deferred.resolve(data.query.results.channel);
    })
    .error(function(err){
    console.log('Error retrieving markets');
    deferred.reject(err);
    });
    return deferred.promise;
    }

    return {
    getWeather: getWeather
    };
    }]);