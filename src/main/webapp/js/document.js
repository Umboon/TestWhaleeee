angular.module('document', ['checklist-model']);
angular.module('document').controller('documentController', function ($scope, $http) {

    $scope.document = {};
    $scope.categorys = {};
    $scope.saveDocument = function () {
        $http.post('/savedocument', $scope.document).success(function (data){
           //  growl("Save Success", "success", "top");
        });
       
    };

    
    
     
    $scope.lodeCategory = {};
    function getCategory(){
        $http.get('/getcategorys').success(function (data){
            $scope.lodeCategory = data;
        });
    }
    getCategory();
//
//    lodeCategory();
//
//    function lodeCategory() {
//        $http.get('/getcategory').success(function (data) {
//            $scope.categorys = data;
//        });
//    }



});

