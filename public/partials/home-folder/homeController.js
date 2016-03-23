angular.module('homeModule', ['ngCookies']).
controller('HomeCtrl', ['$scope','$location','$cookies', 'LocalUserData', function($scope,$location,$cookies, localData) {
    $scope.user = localData.user;
    var username = $cookies.get("email");
    console.log(username);
}])
