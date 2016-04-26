angular.module('loginModule', ['ngMessages', 'ngCookies']).
controller('loginCtrl', ['$scope', 'AuthService', 'LocalUserData', '$location', 'services',
	function($scope, userAuth, localData, $location, services) {
		$scope.validateLogin = function() {
			services.getUserData($scope.user).then(function(response) {
				localData.setData(response.data);
				userAuth.isLoggedIn = true;
				userAuth.auth = response.headers('auth');
				$location.path("/home");
			}, function(error, status, headers, config) {
				alert(error.statusText);
			});
		};
		$scope.createUser = function() {
			services.createUser($scope.user).then(function(response) {
				alert("Please login with your credentials");
				$location.path("/");
			}, function(error) {
				alert(error.response.message);
			});
		};
	}
])