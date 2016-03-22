angular.module('loginModule', ['ngMessages']).
controller('loginCtrl', ['$scope','GetUserData','$http','$location', function($scope,GetUserData,$http,$location) {
    $scope.test = 'success';
    $scope.validateLogin = function(){
        GetUserData.save($scope.user,function(data){
		 	if(data.response =="success"){
		 	    $location.path("/home");
		 	}else{
		 	    alert(data.data);
		 	}
		 });
    };
}])
