angular.module('app.services', ['ngResource'])

.factory("GetUserData", function($resource) {
  return $resource("/checkUserData");
})
.factory("SendUserProfile", function($resource) {
  return $resource("/validateUserProfile");
})

