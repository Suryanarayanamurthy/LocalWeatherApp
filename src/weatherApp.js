
    var app = angular.module('wApp', []);
    app.controller('weatherController', ['$scope', 'weatherService','$q', function ($scope, weatherService,$q) {
    $scope.message = "";
    $scope.getLocalWeather = function(){
        //currentLocationService.getCurrentLocation();
        fetchWeather();
    }

    function fetchWeather() {
var promise = asyncGetLocation();        
    promise.then(function(position) {
    
   var latlon = position.lat + "," + position.long;
    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
        console.log("after promise return"+position.lat+" "+position.long);
    weatherService.getWeather(position.lat,position.long).then(function(data){
    $scope.place = data;
    
    }, function(reason) {
  $scope.message='Failed: ' + reason;
});
    }); 
    }
            
        function asyncGetLocation() {
  // perform some asynchronous operation, resolve or reject the promise when appropriate.
  return $q(function(resolve, reject) {
    setTimeout(function() {
        var coord = { lat:""  ,
                      long:"" };
      if (navigator.geolocation) {
          
          navigator.geolocation.getCurrentPosition(function(position){
              coord.lat =position.coords.latitude;
              coord.long =position.coords.longitude;
              console.log("b4 if"+coord);
               if(coord.lat != 0 && coord.long != 0){
                resolve(coord);
                console.log(coord);
          }
          else reject("Geolocation is not supported by this browser.");
           });
         } else {
        reject("Geolocation is not supported by this browser.");
      }
    }, 1000);
  });
}

   
}]);

    app.factory('weatherService', ['$http', '$q', function ($http, $q){
        
    function getWeather (lat,long) {
//        var lat = currentLocationService.coords.position.coords.latitude;
//        var long = currentLocationService.coords.position.coords.longitude;
    var deferred = $q.defer();
    $http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.placefinder%20WHERE%20text%3D%22"+lat+"%2C"+long+"%22%20and%20gflags%3D%22R%22)&format=json&callback=").success(function(data){
    deferred.resolve(data.query.results.channel);
    }).error(function(err){
    console.log('Error retrieving markets');
    deferred.reject(err);
    });
    return deferred.promise;
    }
            

    return {
    getWeather: getWeather
    };
    }]);



//app.factory('currentLocationService',function(currentLocationService,$q){
//    
//    if (navigator.geolocation) {
//    navigator.geolocation.getCurrentPosition(function (coords) {
//        return
//    {
//        coords: coords
//    };
////        coords = {
////         lat : position.coords.latitude,
////         long : position.coords.longitude
////        }
//    });
//    }
//    
//});


