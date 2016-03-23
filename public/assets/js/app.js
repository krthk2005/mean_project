var app = angular.module('myApp', ['ngRoute', 'app.services', 'loginModule', 'headerModule', 'homeModule', 'settingsModule']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
}]);


app.run(function($rootScope, $location, LocalUserData) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    if ((LocalUserData.user == undefined || LocalUserData.user.email == undefined)) {
      $location.path("/");
    }
  })
})
