angular.module('loginModule', ['ngMessages', 'ngCookies']).
controller('loginCtrl', ['$scope', '$cookies', 'GetUserData', 'CreateUser', 'LocalUserData', '$location',
	function($scope, $cookies, GetUserData, CreateUser, localData, $location) {
		$scope.validateLogin = function() {
			GetUserData.save($scope.user, function(data) {
				if (data.response == "success") {
					localData.setData(data);
					$cookies.put("email", data.email);
					$location.path("/home");
				}
				else {
					alert(data.data);
				}
			});
		};
		$scope.createUser = function() {
			CreateUser.save($scope.user, function(data) {
				alert(data);
			});
		};
	}
])
