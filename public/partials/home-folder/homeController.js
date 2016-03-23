angular.module('homeModule', []).
controller('HomeCtrl', ['$scope','$location', 'AuthService', 'LocalUserData', function($scope,$location, user, localData) {
    $scope.user = localData.user;
    $scope.logout = function() {
        var data = {};
        localData.setData(data);
        $location.path("/");
    }
}])
