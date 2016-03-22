angular.module('homeModule', []).
controller('HomeCtrl', ['$scope','SendUserProfile', function($scope,SendUserProfile){
    $scope.test={};
SendUserProfile.save($scope.test,function(data){
		console.log(data); 	
		 });
}])
