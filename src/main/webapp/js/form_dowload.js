angular.module('form_dowload', []);
angular.module('form_dowload').controller('formdowloadController', function ($http, $scope) {

    $scope.formfiles = {};
    $scope.page = 0;
    $scope.size = '10';
    var totalRow = 0;
    var totalPage = 0;

    getFormTopic();
    function getFormTopic() {
        $http.get('/getformtopic', {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            $scope.formfiles = data;
        });
    }

    $scope.getFormTopic = function () {
        getFormTopic();
    };

    $scope.selectSizeForm = function () {
        $scope.page = 0;
        getFormTopic();
        getTotalRow();
    };

    getTotalRow();
    function getTotalRow() {
        $http.get('/gettotalrowform').success(function (data) {
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
            getFormTopic();
            $('#prePage , #firstPage').addClass('disabled');
            $('#nextPage , #finalPage').removeClass('disabled');
        }
    };

    $scope.prePage = function () {
        if (!$('#prePage').hasClass('disabled')) {
            $scope.page--;
            getFormTopic();
            if ($scope.page == 0) {
                $('#prePage , #firstPage').addClass('disabled');
            }
            $('#nextPage , #finalPage').removeClass('disabled');

        }
    };

    $scope.nextPage = function () {
        if (!$('#nextPage').hasClass('disabled')) {
            $scope.page++;
            getFormTopic();
            if ($scope.page == totalPage - 1) {
                $('#nextPage , #finalPage').addClass('disabled');
            }
            $('#prePage , #firstPage').removeClass('disabled');

        }
    };

    $scope.finalPage = function () {
        if (!$('#nextPage').hasClass('disabled')) {
            $scope.page = totalPage - 1;
            getFormTopic();
            $('#nextPage , #finalPage').addClass('disabled');
            $('#prePage , #firstPage').removeClass('disabled');
        }
    };



    $scope.dowload = function (fld) {
        location.href = '/getfileform/' + fld.file.id;
    };


    $scope.details = function (doc) {
        $http.post('/setdocumentdetail', doc).success(function (data) {
            location.href = "#/detail";
        });
    };






});

