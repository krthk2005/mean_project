var app = angular.module('myApp', ['ngRoute','app.services','loginModule','homeModule','settingsModule'])
.controller('appCtrl',['$scope','LocalUserData',function($scope,localData){
  $scope.logout = function(){
      var data ={};
				localData.setData(data);
  }
}]);

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
      when('/settings', {
        templateUrl: 'partials/settings-folder/settings.html',
        controller: 'settingsCtrl'
      }).
      when('/signUpHere', {
        templateUrl: 'partials/login-folder/signUp.html',
        controller: 'settingsCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
      
      $locationProvider.html5Mode(true);

  
}])
