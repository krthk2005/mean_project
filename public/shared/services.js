angular.module('app.services', ['ngResource'])

.factory("GetUserData", function($resource) {
  return $resource("/checkUserData");
})

