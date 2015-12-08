
var app = angular.module('wApp', []);
var mysrclat = 0;
var mysrclong = 0;

app.controller('weatherController', function ($scope,$http) {
    
    $scope.getLocalWeather = function(){
        YahooWeatherAPI();
    }
  
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
    
    // Base URI for Web service  
var yql_base_uri = "https://query.yahooapis.com/v1/public/yql?q=";  
  
// Create a variable to make results available  
// in the global namespace  
var yql_results = "";  
  
// Create a YQL query to get geo data for the  
// San Francisco International Airport  
//    select * from weather.forecast where woeid in (SELECT woeid FROM geo.placefinder WHERE text="52.4849956,13.4379836" and gflags="R")
var yql_query = "SELECT * from geo.places WHERE text='SFO'";  
    
    // This utility function creates the query string  
// to be appended to the base URI of the YQL Web  
// service.  
//function toQueryString(obj) {      
//  var parts = [];      
//  for(var each in obj) if (obj.hasOwnProperty(each)) {  
//    parts.push(encodeURIComponent(each) + '=' + encodeURIComponent(obj[each]));      
//  }      
//  return parts.join('&');    
//}
    function fixedEncodeURIComponent(str){
        return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A").replace(/\"/g, "%22");
    };
   
    
    function getYahooUrl(lat,long)
    {
//var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.placefinder%20WHERE%20text%3D%22"+lat+"%2C"+long+"%22%20and%20gflags%3D%22R%22)&format=json&diagnostics=true&callback=JSON_CALLBACK";
        var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.placefinder%20WHERE%20text%3D%2252.4849956%2C13.4379836%22%20and%20gflags%3D%22R%22)&format=json&callback=JSON_CALLBACK";
        var url = 
        return url;
    
    }
//    function getYahooUrl(place)
//    {
//        var url = "";
//        return url;
//    }
      function YahooWeatherAPI()
    {
        getCurrentLocation();
        var url = getYahooUrl(mysrclat,mysrclong);
        console.log(url);
        $http.get(url).then(function(response) {
  //$scope.response = angular.toJson(response.data);
            console.log(angular.toJson(response.data));
}).catch(function(response) {
  //$scope.response = response;
            console.log(response);
});
    }
    
    
    
});
