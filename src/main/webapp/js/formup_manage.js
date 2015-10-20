angular.module('formup_manage', []);
angular.module('formup_manage').controller('formupmanageController', function ($http, $scope) {

    $scope.formfiles = {};
    $scope.delete = {};
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


    $scope.clickDelete = function (dele) {
        $scope.delete = dele;
        console.log($scope.delete);
    };
    $scope.deleteForm = function () {
        $('.modal-backdrop.in').css('display', 'none');
        $http.post('/deleteformtopic', $scope.delete).success(function (data) {
            location.href = "#/formup_manage";
            getFormTopic()
        });

    };

    $scope.getFormTopic = function () {
        getFormTopic();
    };

    $scope.selectSizeForm = function () {
        getFormTopic();
        findPage();
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
    ;
    function findPage() {
        var result = parseInt(totalRow / $scope.size);
        if ((totalRow % $scope.size) != 0) {
            result++;
        }
        totalPage = result;
        //  console.log(totalPage + 'totalPage');
    }

    $scope.firstPage = function () {
        $scope.page = 0;
        getFormTopic();
        $('#prePage , #firstPage').addClass('disabled');
        $('#nextPage , #finalPage').removeClass('disabled');
    };

    $scope.prePage = function () {
        if (!$('#prePage').hasClass('disabled')) {
            $scope.page--;
            getFormTopic();
            if ($scope.page == 0) {
                $('#prePage , #firstPage').addClass('disabled');
                $('#nextPage , #finalPage').removeClass('disabled');
            }
        }
    };

    $scope.nextPage = function () {
        if (!$('#nextPage').hasClass('disabled')) {
            $scope.page++;
            getFormTopic();
            if ($scope.page == totalPage - 1) {
                $('#nextPage , #finalPage').addClass('disabled');
                $('#prePage , #firstPage').removeClass('disabled');
            }
        }
    };

    $scope.finalPage = function () {
        $scope.page = totalPage - 1;
        getFormTopic();
        $('#nextPage , #finalPage').addClass('disabled');
        $('#prePage , #firstPage').removeClass('disabled');
    };



    $scope.dowload = function (fld) {
        location.href = '/getfileform/' + fld.file.id;
    };

//
//    $scope.details = function (doc) {
////       location.href="#/detail/";
//        $http.post('/setdocumentdetail', doc).success(function (data) {
//            location.href = "#/detail";
//        });
//    };


  $('body').css('overflowY','scroll');

});


