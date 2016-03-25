angular.module('homeModule', ['ngCookies']).
controller('HomeCtrl', ['$scope', '$location', '$http', '$cookies', 'LocalUserData', function($scope, $location, $http, $cookies, localData) {
    $scope.user = localData.user;
    var APIKEY = "2c56930e3e0117b9943b9f618acfe981";
    //http://api.openweathermap.org/data/2.5/weather?lat=17.3434321&lon=78.536526&appid=6c8c7c715a5bf8cc2938f6279ca2d4c6
    //https://api.forecast.io/forecast/2c56930e3e0117b9943b9f618acfe981/17.3434321,78.536526
    var username = $cookies.get("email");
    console.log(username);

    $scope.nearme = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.latitude = position.coords.latitude;
                $scope.longitude = position.coords.longitude;
                console.log($scope.latitude);
                console.log($scope.longitude);
                if ($scope.latitude != undefined && $scope.latitude > 0) {
                    $http.get('https://api.forecast.io/forecast/2c56930e3e0117b9943b9f618acfe981/17.3434321,78.536526').then(function successCallback(response) {
                        $scope.weather = response.data;
                    }, function errorCallback(response) {
                        console.log("weather not found")
                    });
                }

            });
        }
    }
}])
