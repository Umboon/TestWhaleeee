angular.module('docforcategory', []);
angular.module('docforcategory').controller('docforcateController', function ($http, $scope) {

    $scope.page = 0;
    $scope.size = '10';
    $scope.searchData = {};
    $scope.documents = {};
    var totalRow = 0;
    $scope.user = {};

    getUserUpload();
    function getUserUpload() {
        $http.get('/getuserupload').success(function (data) {
            $scope.user = data;
            // console.log(data.status+'userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
        });
    }

    $scope.checkViewUser = function (doc) {
        // console.log($scope.documents.content[0] + 'hellooooooooooooooooooooooooo');
        if ('Admin' === $scope.user.status) {
            return true;
        }
        else if (('Teacher' === $scope.user.status) && (doc.groupUser === 'Public' || doc.groupUser === 'Teacher')) {
            return true;
        }
        else if (('Student' === $scope.user.status) && doc.groupUser === 'Public') {
            return true;
        }
        else {
            return false;
        }

    };

    function getDocuments() {
        $http.get('/getdocforcate', {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            $scope.documents = data;
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

    $scope.selectSizeDoc = function () {
        getDocuments();
        findPage();
    };


    countDocForCategory();
    function countDocForCategory() {
        $http.get('/countdocforcate').success(function (data) {
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


    var totalPage = 0;

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


