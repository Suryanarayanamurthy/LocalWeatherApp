
var app = angular.module('wApp', []);
var mysrclat = 0;
var mysrclong = 0;

app.controller('weatherController', function ($scope) {
    $scope.test = "Hello Ajs-1.5";

  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            mysrclat = position.coords.latitude;
            mysrclong = position.coords.longitude;
            console.log(mysrclat);
            console.log(mysrclong);
        });
    }
    
});
