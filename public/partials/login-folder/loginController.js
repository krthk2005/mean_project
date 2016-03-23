angular.module('loginModule', ['ngMessages']).
controller('loginCtrl', ['$scope', 'GetUserData', 'LocalUserData', '$location', function($scope, GetUserData, localData, $location) {
	$scope.test = 'success';
	$scope.showName = true;
	$scope.signUp = function() {
		
		setTimeout(function () {
        $scope.$apply(function(){
			$scope.showName = !$scope.showName;
        });
    }, 1000);
    
    
	};
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
}])
