angular.module('doc_manage', []);
angular.module('doc_manage').controller('docmanageController', function ($http, $scope) {

    $scope.searchData = {};
    $scope.documents = {};
    $scope.page = 0;
    $scope.size = '10';
    var totalRow = 0;
    var totalPage = 0;
    $scope.showDatePicker = false;

    $scope.getDocuments = function () {
        getDocuments();
    };

    getDocuments();
    function getDocuments() {
        $http.get('/getdocmanage', {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            $scope.documents = data;
        });
    }

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
    
    
    

  $scope.selectSearchBy = function () {
        if ($scope.searchData.searchBy == 'dateReceived' || $scope.searchData.searchBy == 'dateWork') {
            console.log('true');
            $scope.showDatePicker = true;
        }
        else {
            $scope.showDatePicker = false;
        }
    };

    $scope.search = function () {
        $scope.page = 0;
        $scope.searchData.keyWord;
        $http.post('/searchdocument', $scope.searchData, {params: {page: $scope.page, size: $scope.size}}).success(function (data) {

            $http.post('/countsearchdocument', $scope.searchData).success(function (data) {
                totalRow = data;
//                console.log('-------------------------------->'+data);
               findPage();
              
            });
            $scope.documents = data;
            if (!data.content.length) {
                $("#complete-dialog").modal('show');
            }
        });
    };

    function search() {
        $scope.searchData.keyWord;
        $http.post('/searchdocument', $scope.searchData, {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            $scope.documents = data;
            if (!data.content.length) {
                $("#complete-dialog").modal('show');
            }
        });
    }

    function countSearch() {
        $http.post('/countsearchdocument', $scope.searchData).success(function (data) {
            totalRow = data;

            //  console.log('total search' + data);
        });
    }



    $scope.selectSize = function () {
        $scope.page = 0;
        getDocuments();
        getTotalRow();
    };

    getTotalRow();
    function getTotalRow() {
        $http.get('/gettotalrow').success(function (data) {
            totalRow = data;
            findPage();
            if ($scope.page == 0) {
                $('#prePage, #firstPage').addClass('disabled');
            }
            if ($scope.page == totalPage - 1) {
                $('#nextPage, #finalPage').addClass('disabled');
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
//        if (result <= 1) {
//            $('#prePage , #firstPage').addClass('disabled');
//            $('#nextPage , #finalPage').addClass('disabled');
//        }
//        if (result > 1) {
//            $('#prePage , #firstPage').addClass('disabled');
//            $('#nextPage , #finalPage').removeClass('disabled');
//        }
    }

    $scope.firstPage = function () {
        if (!$('#prePage').hasClass('disabled')) {
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
        if (!$('#nextPage').hasClass('disabled')) {
            $scope.page = totalPage - 1;
            getDocuments();
            $('#nextPage , #finalPage').addClass('disabled');
            $('#prePage , #firstPage').removeClass('disabled');
        }
    };



  $('.datepicker.form-control.col-lg-8').datepicker({
        changeYear: true,
        yearRange: "-100:+100",
        dateFormat: 'yy-mm-dd'
    });



});

