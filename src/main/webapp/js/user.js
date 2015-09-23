angular.module('user', ['checklist-model']);
angular.module('user').controller('userController', function (userService, $scope, $http) {

    $scope.user = userService.detail_user;
    $scope.password = "";


    $scope.saveUser = function () {
        $http.post('/saveuser', $scope.user).success(function (data) {
            getUser();
           

        }).error(function (data) {

        });
    };


    $scope.clearUser = function () {
        $scope.user = {};
        $scope.password = "";
    };
    
    $scope.clear ={};
     clearUser = function () {
        $scope.user = {};
        $scope.password = "";
    };





    $scope.users = {};
    function getUser() {
        $http.get('/getuser').success(function (data) {
            $scope.users = data;
        });
    }
    getUser();




});


