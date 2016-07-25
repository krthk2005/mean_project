angular.module('settingsModule', ['ngMessages']).
controller('settingsCtrl', ['$scope', 'LocalUserData', 'services',
    function($scope, localData, services) {
        $scope.user = localData.user;
        $scope.updateUser = function() {
            services.updateProfile($scope.user).then(function(response) {
                localData.setUpdatedData(response.data);
                alert("data updated successfully")
            }, function(error) {
                alert("Please try again");
            });
        }
    }
])
