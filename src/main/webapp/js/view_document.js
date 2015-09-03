angular.module('view_document', []);
angular.module('view_document').controller('view_documentController', function ($http, $scope) {


    $scope.documents = {};
    function getDocuments() {
        $http.get('/getdocuments').success(function (data) {
            $scope.documents = data;
            console.log($scope.documents);
        });

    }
    getDocuments();





});

