angular.module('homeModule', []).
controller('HomeCtrl', ['$scope','AuthService','LocalUserData', function($scope,user,localData){
    $scope.test=user;
}])
