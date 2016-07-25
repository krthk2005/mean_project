var app = angular.module('myApp', ['ngRoute', 'app.services', 'loginModule', 'headerModule', 'homeModule', 'settingsModule','stickyModule']);


app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  $httpProvider.defaults.headers.common["Accept"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
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
  when('/stickyNotes', {
    templateUrl: 'partials/sticky-folder/sticky.html',
    controller: 'stickyCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
}]);



/*app.run(function($rootScope, $location, LocalUserData) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    if (next.templateUrl == "partials/login-folder/signUp.html") {
      $location.path("/signUpHere");
    }
    else if ((LocalUserData.user == undefined || LocalUserData.user.email == undefined)) {
      $location.path("/");
    }
    else if (next.templateUrl == "partials/login-folder/login.html" && LocalUserData.user.email != undefined) {
      $location.path("/home");
    }
  })
})*/
