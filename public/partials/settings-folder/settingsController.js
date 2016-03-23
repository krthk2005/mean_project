angular.module('settingsModule', ['ngMessages']).
controller('settingsCtrl', ['$scope','GetUserData','SendUserProfile','$location', function($scope,GetUserData,SendUserProfile,$location) {
    $scope.test = 'success';
    SendUserProfile.save($scope.test,function(data){
		console.log(data); 	
		 });
}])
