angular.module('app.services', ['ngResource'])

.factory("GetUserData", function($resource) {
  return $resource("/checkUserData");
})
.factory("CreateUser", function($resource) {
  return $resource("/createUserData");
})
.factory("SendUserProfile", function($resource) {
  return $resource("/validateUserProfile");
})
.factory("ArticleFetch", function($resource) {
  return $resource("/getAllArticles");
})
.factory('AuthService', [function() {
   var user={
    isLoggedIn: false,
    name: '',
    id:0
  };
  return user;
}])

.factory('LocalUserData',  [function(){
	var userData ={};
	userData.setData = function(obj){
		userData.user = obj;
	}
	userData.setWeatherData = function(obj){
		userData.weather = obj;
	}
	return userData;
}])

