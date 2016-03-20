var app = angular.module('myApp', ['ngRoute','loginModule','homeModule']);

app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
	$routeProvider.
      when('/', {
        templateUrl: 'partials/login-folder/login.html',
        controller: 'loginCtrl'
      }).
      when('/home', {
        templateUrl: 'partials/home-folder/home.html',
        controller: 'HomeCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });

  
}])
