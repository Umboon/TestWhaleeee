angular.module('user', []);
angular.module('user').controller('userController', function (userService, $scope, $http) {

    $scope.user = userService.detail_user;
    $scope.password = "";
    $scope.error = {};

    $scope.saveUser = function () {
        if (checkPassword()) {//ตรวจสอบฟังก์ชั่น checkPassword 
            $http.post('/saveuser', $scope.user).success(function (data) {
                getUser();//เรียกใช้ getUser()เพื่อส่งชื่อผู้ใช้มาโชว์
                // $scope.clearUser();
                // growl("บันทึกสำเร็จ", 'msg-green', 'top');
                userService.detail_user = {};
                if (!!userService.detail_user) {
                    userService.detail_user = {};
                    location.href = '#/show_user';//เรียกใช้ location.href เพื่อให้ไปที่หน้าโชว์ชื่อผู้ใช้งาน

                }
            }).error(function (data) {
                $scope.error = data;//ข้อมูลเท่ากับ error
                growl("ชื่อผู้ใช้งานซ้ำ", 'msg-red', 'top');//แสดง Popup แจ้งเตือน ชื่อซ้ำ
            });
        }
        else {
            growl("กรุณากรอกข้อมูลให้ครบถ้วน", 'msg-red', 'top');//แสดง Popup แจ้งเตือนให้กรอกข้อมูลให้ครบถ้วน

        }
    };



    $scope.checkPassword = function () {
        checkPassword();
    };
    function checkPassword() {
        if (!!$scope.password && !!$scope.user.passWord) {
            if (($scope.password == $scope.user.passWord)) {
                $('#confirm').removeClass('mdi-content-clear').addClass('mdi-action-done').css('color', 'green');
                return true;
            }
            if ($scope.password != $scope.user.passWord) {
                $('#confirm').removeClass('mdi-action-done').addClass('mdi-content-clear').css('color', 'red');
                return false;
            }
        }
        else {
            $('#confirm').removeClass('mdi-content-clear , mdi-action-done');
        }
    }


    $scope.clearUser = function () {
        $scope.user = {};
        $scope.password = "";
        checkPassword();
        $scope.user.status = 'Student';
    };

    $scope.clear = {};
    clearUser = function () {
        $scope.user = {};
        $scope.password = "";
        checkPassword();
        $scope.user.status = 'Student';
    };





    $scope.users = {};
    function getUser() {
        $http.get('/getuser').success(function (data) {
            $scope.users = data;
        });
    }
    getUser();




});


