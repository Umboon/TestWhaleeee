angular.module('detail_user', []);
angular.module('detail_user').controller('detailUserController', function (userService, $http, $scope) {

    $scope.user = {};
    $scope.detailuser = {};


    // console.log(userService.detail_user);
    $scope.saveUser = function () {
        $http.post('/saveuser', $scope.user).success(function (data) {
            getUser();
            // growl("Save Success","success","top");

        }).error(function (data) {
            //  growl("Save Error","danger","top");
        });
    };

    $scope.updateUser = function (dtu) {
        userService.detail_user = dtu;  //เรียกใช้ userService เพื่อให้ข้อมูลรายชื่อที่ต้องการแก้ไขค้างอยู่
        location.href = "#/user"; //เรียกใช้ location.href เพื่อให้ย้อนกลับไปที่หน้าของการกรอกข้อมูลผู้ใช้
    };
    $scope.deleteUser = function () {
        $('.modal-backdrop.in').css('display', 'none');//เมื่อโชว์ไดอะล็อกแสดงการลบแล้ว สามารถกลับไปใช้งานได้ปกติ
        $http.post('/deleteuser', $scope.detailuser).success(function (data) {
            location.href = "#/show_user";//เรียกใช้ location.href เพื่อแสดงหน้ารายชื่อผู้ใช้
        });
    };
    
    
    getUserDetail();
    function getUserDetail() {
        $http.get('/getuserdetail').success(function (data) {
            $scope.detailuser = data;
        });
    }

    $scope.detailuser = function (dtu) {
        console.log(dtu);
    };


    $scope.clearUser = function () {
        $scope.user = {};
    };


    $scope.users = {};
    function getUser() {
        $http.get('/getuser').success(function (data) {
            $scope.users = data;
        });
    }
    getUser();



});