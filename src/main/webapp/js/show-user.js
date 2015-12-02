angular.module('show_user', []);
angular.module('show_user').controller('show_usercontroller', function ($http, $scope) {

    $scope.users = {};
    $scope.page = 0;
    $scope.size = '10';
    var totalRow = 0;
    var totalPage = 0;

    getUser();
    function getUser() {
        $http.get('/getuser', {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            $scope.users = data;
        });
    }
    ;

    $scope.getUser = function () {
        getUser();
    };

    $scope.selectSizeUser = function () {
        $scope.page = 0;
        getUser();
        getTotalRow();
    };



    getTotalRow();
    function getTotalRow() {
        $http.get('/gettotalrowuser').success(function (data) {
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
        //  getTotalRow();

    }

    $scope.firstPage = function () {
        if (!$('#prePage').hasClass('disabled')) {
            $scope.page = 0;
            getUser();
            $('#prePage , #firstPage').addClass('disabled');
            $('#nextPage , #finalPage').removeClass('disabled');
        }
    };

    $scope.prePage = function () {
        if (!$('#prePage').hasClass('disabled')) {
            $scope.page--;
            getUser();
            if ($scope.page == 0) {
                $('#prePage , #firstPage').addClass('disabled');

            }
            $('#nextPage , #finalPage').removeClass('disabled');
        }
    };

    $scope.nextPage = function () {
        if (!$('#nextPage').hasClass('disabled')) {
            $scope.page++;
            getUser();
            if ($scope.page == totalPage - 1) {
                $('#nextPage , #finalPage').addClass('disabled');

            }
            $('#prePage , #firstPage').removeClass('disabled');
        }
    };

    $scope.finalPage = function () {
        if (!$('#nextPage').hasClass('disabled')) {
            $scope.page = totalPage - 1;
            getUser();
            $('#nextPage , #finalPage').addClass('disabled');
            $('#prePage , #firstPage').removeClass('disabled');
        }
    };








    $scope.detailuser = function (dtu) {
        $http.post('/setuserdetail', dtu).success(function (data) {
            location.href = "#/detail_user";
        });
    };

});