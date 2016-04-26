angular.module('app.services', ['ngResource'])
  // .run(function($http) {
  //   $http.defaults.headers.common.Auth = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDE5WEdUMUVtd0RUaFBHNTZYSHJDd1ZaNEt2MGh5TVVuMXFSVnRZemk3SWJNeHlSYU16RGJlSC9hSHJZeXVPQ0hoMUhlVXFrb2ZDVC9RPT0iLCJpYXQiOjE0NjE2NjkwMjF9.QOwcsGt--SPv3Nd9tIXgcOgIjTQjxsYmWM9ZhWOQBc4"
  // })



.factory('services', ['$http', 'AuthService', function($http, userAuth) {
  var factoryCall = {};
  factoryCall.createUser = function(data) {
    return $http.post('/createUser', data);
  };
  factoryCall.getUserData = function(data) {
    return $http.post('/userLogin', data);
  };
  factoryCall.submitTodos = function(args) {
    $http.defaults.headers.common.Auth = userAuth.auth;
    return $http.post('/todos', args);
  };
  return factoryCall;
}])

.factory('AuthService', [function() {
  var user = {
    isLoggedIn: false,
    auth: ''
  };
  return user;
}])

.factory('LocalUserData', [function() {
  var userData = {};
  userData.setData = function(obj) {
    userData.user = obj;
  }
  userData.setWeatherData = function(obj) {
    userData.weather = obj;
  }
  return userData;
}])
