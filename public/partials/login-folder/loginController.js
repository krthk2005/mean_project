angular.module('loginModule', ['ngMessages']).
controller('loginCtrl', ['$scope', 'GetUserData', 'CreateUser', 'LocalUserData', '$location', function($scope, GetUserData,CreateUser, localData, $location) {
	$scope.validateLogin = function() {
		GetUserData.save($scope.user, function(data) {
			if (data.response == "success") {
				localData.setData(data);
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
}])
