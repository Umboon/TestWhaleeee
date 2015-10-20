angular.module('user', ['checklist-model']);
angular.module('user').controller('userController', function (userService, $scope, $http) {

    $scope.user = userService.detail_user;
    $scope.password = "";
    $scope.error = {};

    $scope.saveUser = function () {
        if (checkPassword()) {
            $http.post('/saveuser', $scope.user).success(function (data) {
                getUser();
                growl("บันทึกสำเร็จ",'msg-green','top');

            }).error(function (data) {
               $scope.error = data;
               
            });
        }
        else {
            console.log('password error');
             growl("กรุณากรอกข้อมูลให้ครบถ้วน",'msg-red','top');
        }
    };

    $scope.checkPassword = function () {
        checkPassword();
    };
    function checkPassword() {
        if (!!$scope.password && !!$scope.user.passWord){
            if (($scope.password == $scope.user.passWord)) {
                $('#confirm').removeClass('mdi-content-clear').addClass('mdi-action-done').css('color', 'green');
                return true;
            }
            if ($scope.password != $scope.user.passWord) {
                $('#confirm').removeClass('mdi-action-done').addClass('mdi-content-clear').css('color', 'red');
                return false;
            }
        }
        else{
             $('#confirm').removeClass('mdi-content-clear , mdi-action-done');
        }
    }


    $scope.clearUser = function () {
        $scope.user = {};
        $scope.password = "";
        checkPassword();
    };

    $scope.clear = {};
    clearUser = function () {
        $scope.user = {};
        $scope.password = "";
        checkPassword();
    };





    $scope.users = {};
    function getUser() {
        $http.get('/getuser').success(function (data) {
            $scope.users = data;
        });
    }
    getUser();




});


