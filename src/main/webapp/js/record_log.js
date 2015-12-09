angular.module('record_log', []);
angular.module('record_log').controller('recordlogController', function ($http, $scope) {

    $scope.recordlog = {};
    $scope.recordlogArray = [];
    $scope.page = 0;
    $scope.size = '10';
    var totalRow = 0;
    var totalPage = 0;


    function getRecordLog() {
        $http.get('/getrecordlog', {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            for (i = 0; i < $(data.content).length; i++) {//นี่คือส่วนของการบันทึกวันเวลาการล็อกอินเข้าใช้ระบบของผู้ใช้
                $scope.recordlogArray[i] = data.content[i];
                $scope.recordlogArray[i].dateLogin = moment(data.content[i].dateLogin).format("DD-MM-YYYY : HH:mm:ss");
            }
            $scope.recordlog = $scope.recordlogArray;
        });
    }
    getRecordLog();

    $scope.getRecordLog = function () {
        getRecordLog();
    };

    $scope.selectSize = function () {
        $scope.page = 0;
        getRecordLog();
        getTotalRow();

    };

    getTotalRow();
    function getTotalRow() {
        $http.get('/gettotolrowrecordlog').success(function (data) {
            totalRow = data;
            findPage();
            if ($scope.page == 0) {
                $('#prePage , #firstPage').addClass('disabled');
            }
            if ($scope.page == totalPage - 1) {
                $('#nextPage , #finalPage').addClass('disabled');
            }
        });
    }

    function findPage() {
        var result = parseInt(totalRow / $scope.size);
        if ((totalRow % $scope.size) != 0) {
            result++;
        }
        totalPage = result;

    }
    $scope.firstPage = function () {
        if (!$('#prePage').hasClass('disabled')) {
            $scope.page = 0;
            getRecordLog();
            $('#prePage , #firstPage').addClass('disabled');
            $('#nextPage , #finalPage').removeClass('disabled');
        }
    };

    $scope.prePage = function () {
        if (!$('#prePage').hasClass('disabled')) {
            $scope.page--;
            getRecordLog();
            if ($scope.page == 0) {
                $('#prePage , #firstPage').addClass('disabled');
            }
            $('#nextPage , #finalPage').removeClass('disabled');

        }
    };

    $scope.nextPage = function () {
        if (!$('#nextPage').hasClass('disabled')) {
            $scope.page++;
            getRecordLog();
            if ($scope.page == totalPage - 1) {
                $('#nextPage , #finalPage').addClass('disabled');
            }
            $('#prePage , #firstPage').removeClass('disabled');
        }

    };

    $scope.finalPage = function () {
        if (!$('#nextPage').hasClass('disabled')) {
            $scope.page = totalPage - 1;
            getRecordLog();
            $('#nextPage , #finalPage').addClass('disabled');
            $('#prePage , #firstPage').removeClass('disabled');
        }
    };



});