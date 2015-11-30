angular.module('report_up', []);
angular.module('report_up').controller('reportUpController', function ($http, $scope) {

    $scope.documents = {};
    $scope.page = 0;
    $scope.size = '10';
    var totalRow = 0;
    var totalPage = 0;


    function getDocuments() {
        $http.get('/getuploadhistory', {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            $scope.documents = data;

        });
    }
    getDocuments();

    $scope.getDocuments = function () {
        getDocuments();
    };



    $scope.selectSize = function () {
        getDocuments();
        findPage();
    };

    getTotalRow();
    function getTotalRow() {
       $http.get('/countdocforuser').success(function (data) {
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
        $scope.page = 0;
        getDocuments();
        $('#prePage , #firstPage').addClass('disabled');
        $('#nextPage , #finalPage').removeClass('disabled');
    };

    $scope.prePage = function () {
        if (!$('#prePage').hasClass('disabled')) {
            $scope.page--;
            getDocuments();
            getTotalRow();
            if ($scope.page == 0) {
                $('#prePage , #firstPage').addClass('disabled');
                $('#nextPage , #finalPage').removeClass('disabled');
            }
        }
    };

    $scope.nextPage = function () {
        if (!$('#nextPage').hasClass('disabled')) {
            $scope.page++;
            getDocuments();
            if ($scope.page == totalPage - 1) {
                $('#nextPage , #finalPage').addClass('disabled');
                $('#prePage , #firstPage').removeClass('disabled');
            }
        }
    };

    $scope.finalPage = function () {
        $scope.page = totalPage - 1;
        getDocuments();
        $('#nextPage , #finalPage').addClass('disabled');
        $('#prePage , #firstPage').removeClass('disabled');
    };


    $scope.dowload = function (dld) {
        location.href = '/getfile/' + dld.file.id;
    };


    $scope.details = function (doc) {
//       location.href="#/detail/";
        $http.post('/setdocumentdetail', doc).success(function (data) {
            location.href = "#/detail";
        });
    };

    $('body').css('overflowY', 'scroll');

});

