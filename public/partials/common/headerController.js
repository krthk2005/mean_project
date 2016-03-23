angular.module('headerModule', ['ngCookies']).
controller('HeaderCtrl', ['$scope','$location','$cookies', 'LocalUserData', function($scope,$location,$cookies, localData) {
    $scope.user = localData.user;
    var username = $cookies.get("email");
    console.log(username)
    $scope.logout = function() {
        var data = {};
        localData.setData(data);
        $location.path("/");
    }
}])
