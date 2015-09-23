angular.module('view_document', []);
angular.module('view_document').controller('view_documentController', function ($http, $scope) {

    $scope.searchData = {};
    $scope.documents = {};
    $scope.page = 0;
    $scope.size = '10';
    var totalRow = 0;
    var totalPage = 0;
    function getDocuments() {
        $http.get('/getdocuments', {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            $scope.documents = data;
            console.log($scope.documents);
        });

    }
    getDocuments();

    $scope.getDocuments = function () {
        getDocuments();
    };

    $scope.dowload = function (dld) {
        location.href = '/getfile/' + dld.file.id;
    };


    $scope.search = function () {
        $http.post('/searchdocument', $scope.searchData).success(function (data) {
            if (!!data.content[0].id) {
                console.log('true');
                $scope.documents = data;
            }
            $scope.documents = data;

        });
    };

    $scope.selectSize = function () {
        getDocuments();
        findPage();
    };

    getTotalRow();
    function getTotalRow() {
        $http.get('/gettotalrow').success(function (data) {
            totalRow = data;
            console.log('totalrow : ' + totalRow);
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
        console.log(totalPage + 'totalPage');
        console.log(totalRow);
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
});

