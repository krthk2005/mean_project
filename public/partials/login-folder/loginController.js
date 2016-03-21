angular.module('loginModule', ['ngMessages']).
controller('loginCtrl', ['$scope','GetUserData','$http', function($scope,GetUserData,$http) {
    $scope.test = 'success';
    $scope.validateLogin = function(){
        GetUserData.save($scope.user,function(data){
		 	if(data.response =="success"){
		 	    alert("go to home")
		 	}else{
		 	    alert(data.data);
		 	}
		 });
    };
}])
