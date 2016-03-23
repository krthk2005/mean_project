angular.module('app.services', ['ngResource'])

.factory("GetUserData", function($resource) {
  return $resource("/checkUserData");
})
.factory("SendUserProfile", function($resource) {
  return $resource("/validateUserProfile");
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
	return userData;
}])