angular.module('doc_manage', []);
angular.module('doc_manage').controller('docmanageController', function ($http, $scope) {

    $scope.documents = {};
    $scope.page = 0;
    $scope.size = '10';
    var totalRow = 0;
    var totalPage = 0;

    $scope.getDocuments = function () {
        getDocuments();
    };

    getDocuments();
    function getDocuments() {
        $http.get('/getdocmanage', {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            $scope.documents = data;
            console.log(data);

        });
    }



    $scope.selectSize = function () {
        getDocuments();
        findPage();
    };

    getTotalRow();
    function getTotalRow() {
        $http.get('/gettotalrow').success(function (data) {
            totalRow = data;
            findPage();

        });
    }
    ;
    function findPage() {
        var result = parseInt(totalRow / $scope.size);
        if ((totalRow % $scope.size) != 0) {
            result++;
        }
        totalPage = result;
        if (result <= 1) {
            $('#prePage , #firstPage').addClass('disabled');
            $('#nextPage , #finalPage').addClass('disabled');
        }
        if (result > 1) {
            $('#prePage , #firstPage').addClass('disabled');
            $('#nextPage , #finalPage').removeClass('disabled');
        }
    }

    $scope.firstPage = function () {
       if(!$('#prePage').hasClass('disabled')){
            $scope.page = 0;
        getDocuments();
        $('#prePage , #firstPage').addClass('disabled');
        $('#nextPage , #finalPage').removeClass('disabled');
       }
    };

    $scope.prePage = function () {
        if (!$('#prePage').hasClass('disabled')) {
            $scope.page--;
            getDocuments();
            if ($scope.page == 0) {
                $('#prePage , #firstPage').addClass('disabled');
            }
             $('#nextPage , #finalPage').removeClass('disabled');
        }
    };

    $scope.nextPage = function () {
        if (!$('#nextPage').hasClass('disabled')) {
            $scope.page++;
            getDocuments();
            if ($scope.page == totalPage - 1) {
                $('#nextPage , #finalPage').addClass('disabled');
           }
           $('#prePage , #firstPage').removeClass('disabled');
        }
    };

    $scope.finalPage = function () {
       if(!$('#nextPage').hasClass('disabled')){
            $scope.page = totalPage - 1;
        getDocuments();
        $('#nextPage , #finalPage').addClass('disabled');
        $('#prePage , #firstPage').removeClass('disabled');
       }
    };



    $scope.dowload = function (dld) {
        location.href = '/getfile/' + dld.file.id;
    };


    $scope.detaildoc = function (doc) {
//       location.href="#/detail/";
        $http.post('/setdocmanagedetail', doc).success(function (data) {
            //  console.log('click');
            location.href = "#/detail_docmanage";
        });
    };

    $('body').css('overflowY', 'scroll');

});

