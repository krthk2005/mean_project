angular.module('settingsModule', ['ngMessages']).
controller('settingsCtrl', ['$scope','LocalUserData','SendUserProfile','$location', function($scope,localData,SendUserProfile,$location) {
    $scope.user = localData.user;
    $scope.updateUser = function(){
        SendUserProfile.save($scope.user,function(data){
    		console.log(data); 	
    	});    
    }

}])
