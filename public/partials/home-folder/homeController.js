angular.module('homeModule', ['ngCookies'])
    .controller('HomeCtrl', ['$scope', '$location', '$http', '$cookies', 'LocalUserData', 'LocalWeatherData', function($scope, $location, $http, $cookies, localData, localWeatherData) {
        $scope.user = localData.user;
        var APIKEY = "2c56930e3e0117b9943b9f618acfe981";
        //http://api.openweathermap.org/data/2.5/weather?lat=17.3434321&lon=78.536526&appid=6c8c7c715a5bf8cc2938f6279ca2d4c6
        //https://api.forecast.io/forecast/2c56930e3e0117b9943b9f618acfe981/17.3434321,78.536526
        function showIcons() {
            var skycons = new Skycons({
                "color": "black"
            });
            skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
            skycons.add("clear-day", Skycons.CLEAR_DAY);
            skycons.add("clear-night", Skycons.CLEAR_NIGHT);
            skycons.add("rain", Skycons.RAIN);
            skycons.add("snow", Skycons.SNOW);
            skycons.add("sleet", Skycons.SLEET);
            skycons.add("wind", Skycons.WIND);
            skycons.add("fog", Skycons.FOG);
            skycons.add("cloudy", Skycons.CLOUDY);
            skycons.add("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
            skycons.add("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
            skycons.play();
        }



        $scope.nearme = function() {
            if (!(localWeatherData != undefined && localWeatherData.weather != undefined)) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        var latitude = position.coords.latitude;
                        var longitude = position.coords.longitude;
                        if (latitude != undefined && latitude > 0) {
                            $http.jsonp("https://api.forecast.io/forecast/" + APIKEY + "/" + latitude + "," + longitude + "?callback=JSON_CALLBACK").then(function(response) {
                                $scope.weather = response.data.currently;
                                localWeatherData.setData(response.data.currently);
                                setTimeout(showIcons, 100);
                            });
                        }
                    });
                }
            }
            else {
                $scope.weather = localWeatherData.weather;
                setTimeout(showIcons, 100);
            }
        }
    }])
