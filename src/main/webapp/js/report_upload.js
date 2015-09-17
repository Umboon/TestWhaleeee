angular.module('report_up', []);
angular.module('report_up').controller('reportUpController', function ($http, $scope) {


    $scope.documents = {};

    function getDocuments() {
        $http.get('/getdocuments').success(function (data) {
            $scope.documents = data;
            console.log($scope.documents);
        });

    }
    getDocuments();

    $scope.dowload = function (dld) {
        location.href = '/getfile/' + dld.file.id;
    };


    $scope.details = function (doc) {
//       location.href="#/detail/";
        $http.post('/setdocumentdetail', doc).success(function (data) {
            location.href = "#/detail";
        });
    };



});

