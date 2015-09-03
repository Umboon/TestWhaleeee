angular.module('show_user', []);
angular.module('show_user').controller('show_usercontroller', function ($http, $scope) {

    $scope.users = {};
    getUser();
    function getUser() {
        $http.get('/getuser').success(function (data) {

            $scope.users = data;

        });
    }
    ;

    $scope.delUser = {};
    $scope.deleteUser = function () {
        $http.post('/deleteuser', $scope.delUser).success(function (data) {
            getUser();
        });
    };




});