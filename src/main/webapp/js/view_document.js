angular.module('view_document', []);
angular.module('view_document').controller('view_documentController', function ($http, $scope) {

    $scope.searchData = {};
    $scope.documents = {};
    $scope.page = 0;
    $scope.size = '10';
    var totalRow = 0;
    var totalPage = 0;
    $scope.showDatePicker = false;
    var userLogin = {};
    
    loadUserLogin();
    function loadUserLogin(){
        $http.get('/getuserlogin').success(function (data){
            userLogin = data;
            console.log(data.status+'---------');
            getDocuments();
        });
    }
    
    function getDocuments() {
        $http.post('/getdocuments', userLogin, {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            $scope.documents = data;
            //console.log($scope.documents);
            getTotalRow();
            console.log(data);
        });

    }
    
    $scope.getDocuments = function () {
        getDocuments();
    };

    $scope.dowload = function (dld) {
        location.href = '/getfile/' + dld.file.id;
    };

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
        search();
    };

    function search() {
        $scope.searchData.keyWord;
        $http.post('/searchdocument', $scope.searchData, {params: {page: $scope.page, size: $scope.size}}).success(function (data) {
            console.log('true');
            console.log(data);
            countSearch();
            $scope.documents = data;
            if (!data.content.length) {

                $("#complete-dialog").modal('show');
            }
        });
    }

    function countSearch() {
        $http.post('/countsearchdocument', $scope.searchData).success(function (data) {
            totalRow = data;
            console.log('total search' + data);
            findPage();
        });
    }

    $scope.selectSize = function () {
        selectGetOrSearch();
        findPage();
    };

    function selectGetOrSearch() {
        if (!!$scope.searchData.keyWord) {
            search();
        }
        else {
            getDocuments();
        }
    }


    function getTotalRow() {
        $http.get('/gettotalrow').success(function (data) {
            totalRow = data;
            // console.log('totalrow : ' + totalRow);
            findPage();
            console.log(totalPage + " " + $scope.page);
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
    }

    checkLoadPage();
    function checkLoadPage() {
        if (totalPage == 1) {
            $('#prePage , #firstPage , #nextPage , #finalPage').addClass('disabled');
        }
        if (totalPage != 1) {
            $('#prePage , #firstPage').addClass('disabled');
        }
    }

    $scope.firstPage = function () {
        $scope.page = 0;
        selectGetOrSearch();
        $('#prePage , #firstPage').addClass('disabled');
        $('#nextPage , #finalPage').removeClass('disabled');
    };

    $scope.prePage = function () {
        if (!$('#prePage').hasClass('disabled')) {
            $scope.page--;
            selectGetOrSearch();
            if ($scope.page == 0) {
                $('#prePage , #firstPage').addClass('disabled');
            }
            $('#nextPage , #finalPage').removeClass('disabled');
        }
    };

    $scope.nextPage = function () {
        if (!$('#nextPage').hasClass('disabled')) {
            $scope.page++;
            selectGetOrSearch();
            if ($scope.page == totalPage - 1) {
                $('#nextPage , #finalPage').addClass('disabled');
            }
            console.log('remove');
            $('#prePage , #firstPage').removeClass('disabled');
        }
    };

    $scope.finalPage = function () {
        $scope.page = totalPage - 1;
        selectGetOrSearch();
        $('#nextPage , #finalPage').addClass('disabled');
        $('#prePage , #firstPage').removeClass('disabled');
    };

    $('.datepicker.form-control.col-lg-8').datepicker({
        changeYear: true,
        yearRange: "-100:+100",
        dateFormat: 'yy-mm-dd'
    });


});

